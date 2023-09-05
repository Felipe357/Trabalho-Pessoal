package br.agr.terraviva.hol_foto_colaborador.service;

import android.content.Context;
import android.os.StrictMode;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import br.agr.terraviva.hol_foto_colaborador.dao.ColaboradorDao;
import br.agr.terraviva.hol_foto_colaborador.dao.UsuarioDao;
import br.agr.terraviva.hol_foto_colaborador.model.Colaborador;
import br.agr.terraviva.hol_foto_colaborador.model.Usuario;
import br.agr.terraviva.hol_foto_colaborador.util.Constantes;
import br.agr.terraviva.hol_foto_colaborador.util.ToolBox;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.apache.commons.codec.binary.Base64;

public class Sincronismo {

    String url = "";
    String tokenProtheus = "";
    String payloadToken = "";

    private UsuarioDao usuarioDao;
    private ColaboradorDao colaboradorDao;

    public void getUsuario(Context context, String[][] parametros) {
        String codigo = "";
        String usuario = "";
        String nome = "";
        String senha = "";
        String email = "";
        String codpro = "";
        String codsub = "";
        String ativo = "";

        url = ToolBox.obterConfiguracao(context);

        try {
            usuarioDao = new UsuarioDao(context);
            ArrayList<Usuario> listaUsuarios = new ArrayList<>();

            obterToken();
            obterPayload(tokenProtheus);

            String resultado = comunicacao(url + Constantes.WS_USUARIO, parametros);

            JSONArray jsonArr = null;
            jsonArr = new JSONArray(resultado);

            for (int postionJSON = 0; postionJSON < jsonArr.length(); postionJSON++) {
                JSONObject jsonObject = jsonArr.getJSONObject(postionJSON);

                codigo = jsonObject.getString("codigo");
                usuario = jsonObject.getString("usuario");
                nome = jsonObject.getString("nome");
                senha = jsonObject.getString("senha");
                email = jsonObject.getString("email");
                codpro = jsonObject.getString("codpro");
                codsub = jsonObject.getString("codsub");
                ativo = "N";

                Usuario itemUsuario = new Usuario(codigo, usuario, nome, senha, email, codpro, codsub, ativo);
                listaUsuarios.add(itemUsuario);
            }

            usuarioDao.inserirUsuario(listaUsuarios);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void getColaborador(Context context, String[][] parametros) {
        String filial = "";
        String matricula = "";
        String codigo = "";
        String nome = "";
        String custo = "";
        String ugb = "";
        String enviado = "";
        String status = "";
        String imagem = "";
        String excluido = "";
        String foto = "";

        url = ToolBox.obterConfiguracao(context);

        try {
            colaboradorDao = new ColaboradorDao(context);
            ArrayList<Colaborador> listaRetornoColaboradores = new ArrayList<>();

            String resultado = comunicacao(url + Constantes.WS_BUSCAR_COLABORADOR, parametros);

            JSONArray jsonArr = null;
            jsonArr = new JSONArray(resultado);

            for (int positionJSON = 0; positionJSON < jsonArr.length(); positionJSON++) {
                JSONObject jsonObject = jsonArr.getJSONObject(positionJSON);

                filial = jsonObject.getString("filial");
                matricula = jsonObject.getString("matricula");
                codigo = jsonObject.getString("codigo");
                nome = jsonObject.getString("nome");
                custo = jsonObject.getString("custo");
                ugb = jsonObject.getString("ugb");
                enviado = "N";
                status = "ENVIADO";
                imagem = "N";
                excluido = "N";
                foto = jsonObject.getString("foto");

                if (!foto.equals("")) {//SEM FOTO
                    enviado = "S";
                }
                if (parametros[2][1].equals("C")) {
                    Colaborador itemColaborador = new Colaborador(filial, matricula, codigo, nome, custo, ugb, foto, enviado, status, imagem, excluido);
                    listaRetornoColaboradores.add(itemColaborador);
                } else {
                    Colaborador itemColaborador = new Colaborador();
                    itemColaborador.setNome(nome);
                    itemColaborador.setCodigo(codigo);
                    itemColaborador.setMatricula(matricula);
                    itemColaborador.setFilial(filial);
                    itemColaborador.setFoto(foto);
                    itemColaborador.setStatus("ENVIADO");
                    itemColaborador.setEnviado("S");
                    itemColaborador.setImagem("S");
                    itemColaborador.setExcluido("N");

                    colaboradorDao.atualizarColaboradorByMatricula(itemColaborador);
                }

            }

            if (parametros[2][1].equals("C")) {
                colaboradorDao.inserirColaborador(listaRetornoColaboradores);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static void obterToken(String usuario, String senha) {
        String baseUrl = "https://exemplo.com/api"; // URL do token

        try {
            // Construir a URL com os parâmetros de consulta (usuário e senha)
            String urlCompleta = baseUrl + "?user=" + usuario + "&password=" + senha;

            // Criar uma conexão HTTP
            URL url = new URL(urlCompleta);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Configurar a conexão (método POST, por exemplo)
            connection.setRequestMethod("POST");

            // Realizar a solicitação HTTP
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Ler a resposta da solicitação
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                // Analisar o JSON da resposta para obter o token
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(response.toString());
                String accessToken = jsonNode.get("accessToken").asText();

                tokenProtheus = accessToken;
            } else {
                System.err.println("Erro na solicitação HTTP. Código de resposta: " + responseCode);
            }

            // Fechar a conexão
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String obterPayload(String token) {

        try {
            // Decodificar o token JWT usando base64
            String[] tokenParts = token.split("\\.");
            String payload = new String(Base64.decodeBase64(tokenParts[1]), "UTF-8");

            // Analisar o payload decodificado como JSON
            DecodedJWT jwt = JWT.decode(token);
            String codigo = jwt.getClaim("codigo").asString();
            
            payloadToken = codigo
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String comunicacao(String urlEnd, String[][] parametros) {
        System.setProperty("http.keepAlive", "false");

        StringBuilder stringBuilder = new StringBuilder();
        JSONObject jsonObject = new JSONObject();

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        HttpURLConnection httpURLConnection = null;

        try {
            URL url = new URL(urlEnd);

            httpURLConnection = (HttpURLConnection) url.openConnection();

            /*Tempo limite requisição*/
            int timeout = 200000;
            httpURLConnection.setConnectTimeout(timeout);
            httpURLConnection.setReadTimeout(timeout);

            /*Definição padrão cabeçalho Web Service*/
            String headerContentTitle = "Content-type";
            String headerContentAcceptTitle = "application/json";
            httpURLConnection.setRequestProperty(headerContentTitle, headerContentAcceptTitle);

            httpURLConnection.setInstanceFollowRedirects(true);
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);
            httpURLConnection.setRequestMethod("POST");

            OutputStream outputStream = httpURLConnection.getOutputStream();
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));

            for (int position = 0; position < parametros.length; position++) {
                jsonObject.put(parametros[position][0], parametros[position][1]);
            }

            writer.write(jsonObject.toString());
            writer.flush();
            writer.close();

            String responseWS = readStream(httpURLConnection.getInputStream());
            stringBuilder.append(responseWS);

            httpURLConnection.disconnect();

        } catch (Exception e) {
            e.printStackTrace();
            assert httpURLConnection != null;
            httpURLConnection.disconnect();
        }

        return stringBuilder.toString();
    }

    private static String readStream(InputStream inputStream) {
        Reader reader;
        int position;

        Writer writer = new StringWriter();
        char[] buffer = new char[1024];

        try {
            reader = new BufferedReader(
                    new InputStreamReader(
                            inputStream,
                            StandardCharsets.UTF_8
                    )
            );

            while ((position = reader.read(buffer)) != -1) {
                writer.write(buffer, 0, position);
            }

            reader.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return writer.toString();
    }
}