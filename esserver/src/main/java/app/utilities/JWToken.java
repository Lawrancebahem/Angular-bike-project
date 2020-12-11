package app.utilities;

import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JWToken {
  public static final String JWT_ATTRIBUTE_NAME = "JWTokenInfo";
  private static final String JWT_USERNAME_CLAIM = "sub";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ADMIN_CLAIM = "admin";

  private String username;
  private Long userId;
  private boolean admin;

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
                    .claim(JWT_ADMIN_CLAIM, this.admin)
                    .setIssuer(issuer)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                    .signWith(key, SignatureAlgorithm.HS512)
                    .compact();

    return token;
  }


  public static JWToken decode(String token, String passPhrase){
    try {
      Key key = getKey(passPhrase);
      Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(token);
      Claims claims = jws.getBody();
      JWToken jwToken = new JWToken(claims.get(JWT_USERNAME_CLAIM).toString(), Long.valueOf(claims.get(JWT_USERID_CLAIM).toString()),
        (boolean) claims.get(JWT_ADMIN_CLAIM));

      return jwToken;
    }catch (ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException E){
      return null;
    }
  }

  private static Key getKey(String passPhrase){
    byte [] hmacKey = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    return key;
  }


  public static String getJwtAttributeName() {
    return JWT_ATTRIBUTE_NAME;
  }

  public static String getJwtUsernameClaim() {
    return JWT_USERNAME_CLAIM;
  }

  public static String getJwtUseridClaim() {
    return JWT_USERID_CLAIM;
  }

  public static String getJwtAdminClaim() {
    return JWT_ADMIN_CLAIM;
  }

  public String getUsername() {
    return username;
  }

  public Long getUserId() {
    return userId;
  }

  public boolean isAdmin() {
    return admin;
  }
}
