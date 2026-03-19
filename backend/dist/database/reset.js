"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        console.log('🗑️  Resetting database...');
        const userModel = app.get('UserModel');
        const propertyModel = app.get('PropertyModel');
        await userModel.deleteMany({});
        await propertyModel.deleteMany({});
        try {
            const contactModel = app.get('ContactModel');
            await contactModel.deleteMany({});
        }
        catch (e) {
        }
        try {
            const favoriteModel = app.get('FavoriteModel');
            await favoriteModel.deleteMany({});
        }
        catch (e) {
        }
        console.log('✅ Database reset successfully!');
    }
    catch (error) {
        console.error('❌ Error resetting database:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=reset.js.map