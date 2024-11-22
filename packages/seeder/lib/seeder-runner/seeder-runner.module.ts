import {DynamicModule, Module} from '@nestjs/common';
import {Document} from 'mongoose';

import {SeederRunner} from "../types";
import {SEEDERS_KEY} from "../constants";
import {SeederRunnerService} from './seeder-runner.service';

@Module({})
export class SeederRunnerModule {
  public static forRootAsync(seeders: Array<new () => SeederRunner<Document>>): DynamicModule {
    return {
      module: SeederRunnerModule,
      providers: [
        {
          provide: SEEDERS_KEY,
          useValue: seeders,
        },
        SeederRunnerService,
      ],
      exports: [SEEDERS_KEY, SeederRunnerService],
    };
  }
}
