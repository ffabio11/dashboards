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
exports.DashboardService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DashboardService {
    moveDashboard(userId, dashboardId, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashboards = yield prisma.dashboard.findMany({
                where: {
                    userId: userId,
                },
                orderBy: {
                    position: "asc",
                },
            });
            if (position >= dashboards.length) {
                return false;
            }
            const oldPosition = dashboards.findIndex((i) => i.id === dashboardId);
            if (oldPosition === -1) {
                return false;
            }
            const [dashboard] = dashboards.splice(oldPosition, 1);
            dashboards.splice(position, 0, dashboard);
            yield this.reorderDashboards(dashboards);
            return true;
        });
    }
    createContent(userId, dashboardId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashboard = yield this.getDashboard(userId, dashboardId);
            if (!dashboard) {
                return null;
            }
            const countContent = yield prisma.content.count({
                where: {
                    dashboardId: dashboardId,
                },
            });
            return yield prisma.content.create({
                data: {
                    position: countContent,
                    text: text,
                    dashboardId: dashboardId,
                },
            });
        });
    }
    createDashboard(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const countDashboard = yield prisma.dashboard.count();
            return yield prisma.dashboard.create({
                data: {
                    position: countDashboard,
                    name: name,
                    userId: userId,
                },
            });
        });
    }
    deleteDashboard(userId, dashboardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashboard = yield this.getDashboard(userId, dashboardId);
            if (!dashboard) {
                return null;
            }
            const contentsInDashboard = yield prisma.content.count({
                where: {
                    dashboardId: dashboardId,
                },
            });
            if (contentsInDashboard > 0) {
                return null;
            }
            return yield prisma.dashboard.delete({
                where: {
                    id: dashboardId,
                },
            });
        });
    }
    deleteContent(userId, dashboardId, contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashboard = yield this.getDashboard(userId, dashboardId);
            if (!dashboard) {
                return null;
            }
            const deleted = yield prisma.content.delete({
                where: {
                    id: contentId,
                    id_dashboardId: {
                        dashboardId: dashboardId,
                        id: contentId,
                    },
                },
            });
            const allContents = yield prisma.content.findMany({
                where: {
                    dashboardId: dashboardId,
                },
            });
            yield this.reorderContent(allContents, dashboardId);
            return deleted;
        });
    }
    moveContent(userId, contentId, position, fromDashboardId, toDashboardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fromToSameDashboard = fromDashboardId === toDashboardId;
            const fromDashboard = yield this.getDashboard(userId, fromDashboardId);
            if (!fromDashboard) {
                return false;
            }
            if (!fromToSameDashboard) {
                const toDashboard = yield this.getDashboard(userId, toDashboardId);
                if (!toDashboard) {
                    return false;
                }
            }
            const fromContents = yield prisma.content.findMany({
                orderBy: {
                    position: "asc",
                },
                where: {
                    dashboardId: fromDashboardId,
                },
            });
            const toContents = fromToSameDashboard
                ? fromContents
                : yield prisma.content.findMany({
                    orderBy: {
                        position: "asc",
                    },
                    where: {
                        dashboardId: toDashboardId,
                    },
                });
            if (position > toContents.length) {
                return false;
            }
            const oldPosition = fromContents.findIndex((i) => i.id === contentId);
            if (oldPosition === -1) {
                return false;
            }
            const [content] = fromContents.splice(oldPosition, 1);
            if (oldPosition < position) {
                position = position - 1;
            }
            toContents.splice(position, 0, content);
            yield this.reorderContent(fromContents, fromDashboardId);
            if (!fromToSameDashboard) {
                yield this.reorderContent(toContents, toDashboardId);
            }
            return true;
        });
    }
    getDashboards(userId) {
        return prisma.dashboard.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                position: "asc",
            },
            include: {
                contents: {
                    orderBy: {
                        position: "asc",
                    },
                },
            },
        });
    }
    reorderDashboards(dashboards) {
        return __awaiter(this, void 0, void 0, function* () {
            //prisma.$transaction(); FA ESEGUIRE A PRISMA TANTE COSE CONTEMPORANEAMENTE
            const updates = dashboards.map((dash, position) => {
                return prisma.dashboard.update({
                    where: {
                        id: dash.id,
                    },
                    data: {
                        position: position,
                    },
                });
            });
            prisma.$transaction(updates);
        });
    }
    reorderContent(contents, dashboardId) {
        return __awaiter(this, void 0, void 0, function* () {
            //prisma.$transaction(); FA ESEGUIRE A PRISMA TANTE COSE CONTEMPORANEAMENTE
            const updates = contents.map((content, position) => {
                return prisma.content.update({
                    where: {
                        id: content.id,
                    },
                    data: {
                        position: position,
                        dashboardId: dashboardId,
                    },
                });
            });
            prisma.$transaction(updates);
        });
    }
    getDashboard(userId, dashboardId) {
        return prisma.dashboard.findUnique({
            where: {
                id_userId: {
                    userId: userId,
                    id: dashboardId
                },
            },
        });
    }
}
exports.DashboardService = DashboardService;
