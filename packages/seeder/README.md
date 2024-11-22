# `@gen/nestjs-mongoose-seeder`

**nestjs-mongoose-seeder** is a powerful tool for database seeding in NestJS applications using Mongoose. It simplifies the process of populating databases with seed data, offering flexibility and reusability.

---
## Installation
Ensure you have NestJS and Mongoose installed in your project.

```bash
   npm install @namespace/nestjs-mongoose-seeder
```

---

## Requirements

- **NestJS** version ^10.0.0
- **Mongoose** version ^7.0.0
- **TypeScript** version ^5.0.0
---


## Usage

### 1. Import `SeederRunnerModule`

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederRunnerModule } from '@namespace/nestjs-mongoose-seeder';

import { VideoSeeder } from './seeders/video.seeder';

@Module({
  imports: [
    MongooseModule.forRoot({
      uri: `mongodb://user:pass@localhost:27017/default?authSource=admin`,
    }),
    MongooseModule.forFeature([VideoModelDefinition]),
    SeederRunnerModule.forRootAsync([VideoSeeder]),
  ],
})
export class AppModule {}
```
---
### 2. Create a Seeder

```typescript
import { Seeder, SeederRunner } from '@gen/nestjs-mongoose-seeder';
import { Model } from 'mongoose';

import { IVideoDocument, VideoModelDefinition } from './video.schema';

@Seeder(VideoModelDefinition)
export class VideoSeeder extends SeederRunner<IVideoDocument> {
  public async run(model: Model<IVideoDocument>): Promise<void> {
    await model.deleteMany();
    
    await model.insertMany([
      { title: 'Video 1', description: 'Description 1' },
      { title: 'Video 2', description: 'Description 2' },
    ]);
  }
}

```
--- 
### 3. Run the Seeder
Execute the seeders within your application:

```typescript
const bootstrap = async (): Promise<void> => {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  await appContext.close();
};

void bootstrap();
```
---

## API

## **Module:** `SeederRunnerModule`
- forRootAsync(seeders: Array<new () => SeederRunner<any>>): DynamicModule
Registers an array of seeders for execution.

--- 
## Features
- Automatic registration and execution of seeders.
- Full integration with NestJS and Mongoose.
- Easy configuration and execution.
---
## Example Project Structure
```
src/
  seeders/
    video.seeder.ts
  schemas/
    video.schema.ts
  app.module.ts
```
---

## Contributing
We welcome contributions! To propose changes or fixes, please open a new Pull Request.

---
## License
This project is licensed under the MIT license.
