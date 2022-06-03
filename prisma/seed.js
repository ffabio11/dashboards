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
        yield prisma.dashboard.create({
            data: {
                name: 'dashboard 1',
                position: 0,
                contents: {
                    create: [
                        {
                            text: 'ciao a tutti',
                            position: 0
                        },
                        {
                            text: 'qualcosa da fare',
                            position: 1
                        },
                    ],
                }
            }
        });
        yield prisma.dashboard.create({
            data: {
                name: 'dashboard 2',
                position: 1,
                contents: {
                    create: [
                        {
                            text: 'ciao Belli',
                            position: 0
                        },
                        {
                            text: 'TODO',
                            position: 1
                        },
                    ],
                }
            }
        });
    });
}
main()
    .then(() => {
    console.log('OK');
    process.exit(0);
})
    .catch((err) => {
    console.error(err);
    process.exit(0);
});
