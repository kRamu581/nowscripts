import mongoose, { Document, Schema } from 'mongoose';

export interface ISystemSettings extends Document {
  login_enabled: boolean;
}

const systemSettingsSchema = new Schema<ISystemSettings>({
  login_enabled: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model<ISystemSettings>('SystemSettings', systemSettingsSchema);
