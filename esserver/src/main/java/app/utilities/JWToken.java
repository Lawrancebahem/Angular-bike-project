package app.utilities;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JWToken {
  private static final String JWT_USERNAME_CLAIM = "sub";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ADMIN_CLAIM = "admin";

  private String username = null;
  private Long userId = null;
  private boolean admin = false;

  public JWToken(String username, Long userId, boolean admin) {
    this.username = username;
    this.userId = userId;
    this.admin = admin;
  }

  public String encode(String issuer, String passPhrase, int expiration){
    Key key = getKey(passPhrase);
    String token = Jwts.builder()
                    .claim(JWT_USERNAME_CLAIM, this.username)
                    .claim(JWT_USERID_CLAIM, this.userId)
                    .claim(JWT_ADMIN_CLAIM, this.username)
                    .setIssuer(issuer)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                    .signWith(key, SignatureAlgorithm.HS512)
                    .compact();

    return token;
  }

  private static Key getKey(String passPhrase){
    byte [] hmacKey = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    return key;
  }
}
