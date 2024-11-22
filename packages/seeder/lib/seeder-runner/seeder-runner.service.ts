import {Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ModuleRef, Reflector} from '@nestjs/core';
import {getModelToken, ModelDefinition} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import {SEEDER_KEY, SEEDERS_KEY} from "../constants";
import {SeederRunner} from "../types";


@Injectable()
export class SeederRunnerService implements OnModuleInit {
  private readonly logger = new Logger(SeederRunnerService.name);

  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly reflector: Reflector,
    @Inject(SEEDERS_KEY) private readonly seeders: Array<new () => SeederRunner<Document>>,
  ) {
  }

  public async onModuleInit(): Promise<void> {
    const context = {};

    for (const Seeder of this.seeders) {
      const seederInstance = new Seeder();
      const metadata = this.reflector.get(SEEDER_KEY, seederInstance.constructor) as ModelDefinition;

      if (metadata && typeof seederInstance.run === 'function') {
        const model = this.moduleRef.get(getModelToken(metadata.name), {strict: false}) as Model<Document>;
        await seederInstance.run(model, context);
      }
    }

    this.logger.log('Seeding completed.');
  }
}
