const generateAuthCode = (user_id, client_id, scopes, redirect_url, expires_at)=>{

    console.log(user_id, client_id, scopes)
    const code = Buffer.from(client_id + ':' + user_id + ':' + scopes, 'ascii').toString('hex');

    return  code
}


const issueToken = ()=>{

    const id_token = {
        header : {
            "alg": "RS256",
            "typ": "JWT",
            "kid": "【環境変数KEYIDで指定されたもの】"
          },
        payload : {
            "token_use": "id",
            "iat": 1541682283,
            "exp": 1541685883,
            "aud": "test_clientid",
            "iss": "【環境変数ISSUERで指定されたもの】",
            "sub": "test_usrid"
          },
          signature : "id_token_sig"
    }

    const access_token = {
        header : {
            "alg": "RS256",
            "typ": "JWT",
            "kid": "【環境変数KEYIDで指定されたもの】"
          },
        payload : {
            "token_use": "access",
            "scope": "test_scope",
            "iat": 1541682283,
            "exp": 1541685883,
            "aud": "test_clientid",
            "iss": "【環境変数ISSUERで指定されたもの】",
            "sub": "test_usrid"
          },
        signature : "access_token_sig"
    }


    const tokens = {
        access_token : access_token,
        id_token : id_token,
        token_type : "Bearer",
        expires_in : 3600
    }

    return tokens
}




module.exports = {generateAuthCode ,issueToken}