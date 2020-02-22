const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async args => {
        const user = args.name.concat(args.pswd);
        const hash = '$2b$12$CryzQlgMsszNGefo5jPwy.zVC73i26idihqsI68b1jwq./VO0yL9W'
        const isEqual = bcrypt.compareSync(user, hash);
        if(!isEqual) {
            return Error('Invalid username or password');
        }
        const token = jwt.sign(
            { user: args.name },
            'somesupersecretprivatekey',
            {
                expiresIn: '1h'
            }
        )
        return { token, tokenExpiration: 1}
    }
}