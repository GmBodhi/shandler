const {FInteraction} = require('./FInteraction')
const {Interaction} = require('./interaction')
const callback = async (res, data) =>{
    if (!data) return;
    if (!res.token) throw new Error('Token missing');
    data.token = res.token
    let interaction;
    if (res instanceof FInteraction){
        let guild = res.guild
        let member = res.member
        let channel = res.channel
        let extras = {
            member,
            channel,
            guild
        }
        interaction = new FInteraction(res.client, data, extras)
    }else if(res instanceof Interaction){        
        let guild = res.guild
        let member = res.member
        let channel = res.channel
        let extras = {
            member,
            channel,
            guild
        }
        interaction = new FInteraction(res.client, data, extras)
    }else{
        throw new Error('Unexpected object')
    }
    return interaction;
}
module.exports = callback