#!/bin/bash

# Delete existing .js files in the project
find src -type f -name "*.js" -exec rm {} +
find migrations -type f -name "*.js" -exec rm {} +
find seeders -type f -name "*.js" -exec rm {} +

# Create the folder structure
mkdir -p src/{config,controllers,models,routes,middlewares,services,utils} \
         migrations seeders tests/{controllers,services,routes}

# Create .ts files
touch src/config/{db.ts,redis.ts,index.ts} \
      src/controllers/{authController.ts,categoryController.ts,earningsController.ts,expensesController.ts} \
      src/models/{userModel.ts,categoryModel.ts,earningsModel.ts,expensesModel.ts} \
      src/routes/{authRoutes.ts,categoryRoutes.ts,earningsRoutes.ts,expensesRoutes.ts,index.ts} \
      src/middlewares/{authMiddleware.ts,errorHandler.ts,rateLimiter.ts} \
      src/services/{authService.ts,categoryService.ts,earningsService.ts,expensesService.ts} \
      src/utils/{logger.ts,validators.ts} \
      src/{app.ts,server.ts} \
      migrations/[timestamp]-initial-schema.ts \
      seeders/[timestamp]-seed-data.ts \
      tests/controllers/placeholder.test.ts \
      tests/services/placeholder.test.ts \
      tests/routes/placeholder.test.ts \
      .env .gitignore package.json README.md

echo "All .js files removed and replaced with .ts files!"
