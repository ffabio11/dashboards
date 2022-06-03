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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./prisma");
const bcrypt_1 = require("bcrypt");
const auth = (0, express_1.default)();
exports.auth = auth;
//auth.use(express.json());
auth.post("/login", (req, res) => { });
auth.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const hashedPassword = (0, bcrypt_1.hashSync)(password, 10);
    const user = yield prisma_1.prisma.user.create({
        data: {
            email: email,
            name: name,
            passwordHash: hashedPassword,
        },
    });
}));
