import {Schema, model, models} from "mongoose";
import User from "./User";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt:{
        type: String,
        required: [true, 'Prompt is required.'], 
    },
    tag:{
        type: String,
        required: [true, 'Tag is required.'],
    }
})

PromptSchema.statics.findByCreatorName = function(username) {
    let query = this.findOne()

    User.findOne({username: username}, function (error, person) {
        query.where(
          {creator: person._id}
        );
      })
    return query
}

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;