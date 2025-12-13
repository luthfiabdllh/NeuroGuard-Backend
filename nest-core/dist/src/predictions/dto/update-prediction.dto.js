"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePredictionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_prediction_dto_1 = require("./create-prediction.dto");
class UpdatePredictionDto extends (0, mapped_types_1.PartialType)(create_prediction_dto_1.CreatePredictionDto) {
}
exports.UpdatePredictionDto = UpdatePredictionDto;
//# sourceMappingURL=update-prediction.dto.js.map