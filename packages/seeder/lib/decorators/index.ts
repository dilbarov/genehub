import {SetMetadata} from "@nestjs/common";
import {ModelDefinition} from "@nestjs/mongoose";

import {SEEDER_KEY} from "../constants";

export const Seeder = (modelDefinition: Required<Pick<ModelDefinition, 'name' | 'schema'>>): ClassDecorator =>
    SetMetadata(SEEDER_KEY, modelDefinition);