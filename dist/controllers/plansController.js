import { PlansService } from "../services/plansService.js";
export class PlansController {
    plansService = new PlansService();
    // GET /plans
    getAllPlans = async (req, res, next) => {
        try {
            const plans = await this.plansService.getAllPlans();
            res.json({ plans, message: "All plans fetched successfully" });
        }
        catch (error) {
            next(error);
        }
    };
    // POST /plans
    createPlan = async (req, res, next) => {
        try {
            // req.body is of type CreatePlanBody
            const plan = await this.plansService.createPlan(req.body);
            res.status(201).json({ plan, message: "Plan created successfully" });
        }
        catch (error) {
            next(error);
        }
    };
    // PATCH /plans/:type
    updatePlan = async (req, res, next) => {
        try {
            // req.params.type is of type string
            const plan = await this.plansService.updatePlan(req.params.type, req.body);
            res.json({ plan, message: "Plan updated successfully" });
        }
        catch (error) {
            next(error);
        }
    };
    // DELETE /plans/:type
    deletePlan = async (req, res, next) => {
        try {
            await this.plansService.deletePlan(req.params.type);
            res.status(204).json({ message: "Plan deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    };
}
