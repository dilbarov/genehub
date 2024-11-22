import {Document, Model} from 'mongoose';

export abstract class SeederRunner<T extends Document> {
  public abstract run(model: Model<T>, context?: unknown): Promise<void>;
}