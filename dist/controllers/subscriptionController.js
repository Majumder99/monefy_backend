import stripe from "../config/stripe.js";
import { SubscriptionService } from "../services/subscriptionService.js";
export class SubscriptionController {
    subscriptionService = new SubscriptionService();
    // POST /subscribe
    subscribe = async (req, res, next) => {
        try {
            const userId = req.user.userId; // Set by authenticate middleware
            const { type, paymentPeriod } = req.body;
            // Retrieve the plan details
            const plan = await this.subscriptionService.getPlan(type);
            if (!plan)
                throw new Error("Invalid plan type");
            const priceId = paymentPeriod === "monthly"
                ? plan.dataValues.pricePerMonth
                : plan.dataValues.pricePerYear;
            if (!priceId)
                throw new Error("Invalid payment period");
            // Create Stripe Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: plan.dataValues.type,
                                description: "Subscription plan",
                                images: ["https://example.com/t-shirt.png"],
                            },
                            unit_amount: priceId * 100, // Stripe requires amount in cents
                            recurring: {
                                interval: paymentPeriod === "monthly" ? "month" : "year",
                            },
                        },
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                success_url: `${process.env.CLIENT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CLIENT_PUBLIC_URL}/cancel`,
                metadata: {
                    userId: userId,
                    planType: type,
                    paymentPeriod: paymentPeriod,
                },
            });
            res.status(200).json({ url: session.url });
        }
        catch (error) {
            next(error);
        }
    };
    // POST /webhook (Stripe webhook to handle subscription events)
    webhook = async (req, res, next) => {
        try {
            const sig = req.headers["stripe-signature"];
            let event;
            try {
                // Pass the *raw* body, not a parsed object
                event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
            }
            catch (err) {
                res.status(400).send(`Webhook Error: ${err.message}`);
            }
            // At this point, the signature was verified. Now handle `event`:
            if (!event) {
                throw new Error("Event is undefined");
            }
            switch (event.type) {
                case "checkout.session.completed": {
                    const session = event.data.object;
                    const userId = session.metadata?.userId; // Assuming metadata contains userId
                    if (userId) {
                        await this.subscriptionService.createUserSubscription(Number(userId), session.metadata?.planType ?? "", session.metadata?.paymentPeriod === "monthly" ||
                            session.metadata?.paymentPeriod === "yearly"
                            ? session.metadata.paymentPeriod
                            : "monthly");
                    }
                    break;
                }
                default:
                    res.status(500).json({ message: "Error in server", event });
                    break;
            }
            // Return a 200 to acknowledge receipt of the event
            res.sendStatus(200);
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err}`);
        }
    };
    // POST /cancel
    cancel = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.subscriptionService.cancelUserSubscription(userId);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    // GET /user subscription
    getUserSubscription = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.subscriptionService.getUserSubscription(userId);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    // GET /success
    successPage = async (req, res) => {
        // You can redirect to a success page here(ejs success.ejs)
        // res.render("success.ejs", { title: "Subscription successful!" });
        res.send("Successfully payment");
    };
    // GET /cancel
    cancelPage = async (req, res) => {
        res.redirect("/");
    };
}
