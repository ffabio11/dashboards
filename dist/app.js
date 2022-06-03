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
exports.app = void 0;
const express_1 = require("express");
const dashboard_service_1 = require("./dashboard-service");
const prisma_1 = require("./prisma");
const path_1 = __importDefault(require("path"));
const dashboardService = new dashboard_service_1.DashboardService();
const app = (0, express_1.Router)();
exports.app = app;
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/index.html"));
});
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findFirst({
        where: {
            email: "carloking@example.com",
        },
    });
    return user;
});
app.get("/dashboards", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dashboards = yield dashboardService.getDashboards("cl3sl26rf0000rcuvdkvv57zu");
    res.status(200).send(dashboards);
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const user = yield getUser();
    yield dashboardService.createDashboard(user.id, name);
    const dashboards = yield dashboardService.getDashboards(user.id);
    res.status(200).send(dashboards);
}));
app.post("/:dashboardId/move", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { position } = req.body;
    const { dashboardId } = req.params;
    const user = yield getUser();
    // Controlla che la dashboard esista
    // Sposta la dashboard
    const ok = yield dashboardService.moveDashboard(user.id, dashboardId, position);
    if (!ok) {
        return res.status(401).send({ msg: "Cannot move dashboard" });
    }
    const dashboards = yield dashboardService.getDashboards(user.id);
    res.status(200).send(dashboards);
}));
app.post("/:dashboardId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dashboardId } = req.params;
    const { text } = req.body;
    //const user = await getUser();
    const user = { id: "cl3sl26rf0000rcuvdkvv57zu" };
    console.log('ciao');
    const data = yield dashboardService.createContent(user.id, dashboardId, text);
    console.log(data);
    const dashboards = yield dashboardService.getDashboards(user.id);
    res.status(200).send(dashboards);
}));
app.delete("/:dashboardId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dashboardId } = req.params;
    const user = yield getUser();
    const dashboard = yield dashboardService.deleteDashboard(user.id, dashboardId);
    if (!dashboard) {
        return res.status(401).send({ msg: "Cannot delete dashboard" });
    }
    const dashboards = yield dashboardService.getDashboards(user.id);
    res.status(200).send(dashboards);
}));
app.delete("/:dashboardId/:contentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dashboardId, contentId } = req.params;
    const user = yield getUser();
    const content = yield dashboardService.deleteContent(user.id, dashboardId, contentId);
    if (!content) {
        return res.status(401).send({ msg: "Cannot delete content" });
    }
    const dashboards = yield dashboardService.getDashboards(user.id);
    res.status(200).send(dashboards);
}));
app.post("/:dashboardId/:contentId/move", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const to = req.body;
    const { dashboardId, contentId } = req.params;
    const user = yield getUser();
    // Controlla che la dashboard esista
    // Sposta la dashboard
    const ok = yield dashboardService.moveContent(user.id, contentId, to.position, dashboardId, to.dashboardId);
    if (!ok) {
        return res.status(401).send({ msg: "Cannot move content" });
    }
    const dashboards = yield dashboardService.getDashboards(user.id);
    res.status(200).send(dashboards);
}));
