"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                name: "Carlo",
                email: "carloking@example.com",
                passwordHash: "",
            },
        });
        const user2 = yield prisma.user.create({
            data: {
                name: "Paolo",
                email: "Paolo@example.com",
                passwordHash: "",
            },
        });
        yield prisma.dashboard.create({
            data: {
                name: "Dashboard 1",
                position: 0,
                userId: user2.id,
                contents: {
                    create: [
                        {
                            text: "Ciao a tutti",
                            position: 0,
                        },
                        {
                            text: "Qualcosa da fare",
                            position: 1,
                        },
                    ],
                },
            },
        });
        yield prisma.dashboard.create({
            data: {
                name: "Dashboard 2",
                position: 1,
                userId: user.id,
                contents: {
                    create: [
                        {
                            text: "Ciao Lacerba",
                            position: 0,
                        },
                        {
                            text: "I miei task",
                            position: 1,
                        },
                    ],
                },
            },
        });
        yield prisma.dashboard.create({
            data: {
                name: "Conquistare il mondo",
                position: 2,
                userId: user.id,
                contents: {
                    create: [
                        {
                            text: "Valutare i miei colleghi",
                            position: 0,
                        },
                        {
                            text: "Superare i miei colleghi",
                            position: 1,
                        },
                    ],
                },
            },
        });
    });
}
main()
    .then(() => {
    console.log("Ok!");
    process.exit(0);
})
    .catch((error) => {
    console.log(error);
    process.exit(0);
});
