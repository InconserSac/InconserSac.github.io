package controller;

import model.Usuario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/UsuarioServlet")
public class UsuarioServlet extends HttpServlet {
    private UsuarioController usuarioController = new UsuarioController();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("login".equals(action)) {
            String correo = request.getParameter("correo");
            String contraseña = request.getParameter("contraseña");
            Usuario usuario = usuarioController.login(correo, contraseña);
            if (usuario != null) {
                request.getRequestDispatcher("/home.jsp").forward(request, response); // Línea 36
            } else {
                request.setAttribute("errorMessage", "Correo o contraseña incorrectos");
                request.getRequestDispatcher("/login.jsp").forward(request, response);
            }
        } else if ("register".equals(action)) {
            String nombre = request.getParameter("nombre");
            String correo = request.getParameter("correo");
            String usuario = request.getParameter("usuario");
            String contraseña = request.getParameter("contraseña");

            Usuario nuevoUsuario = new Usuario(nombre, correo, usuario, contraseña);
            boolean registrado = usuarioController.register(nuevoUsuario);
            if (registrado) {
                request.getRequestDispatcher("/login.jsp").forward(request, response);
            } else {
                request.setAttribute("errorMessage", "Error en el registro");
                request.getRequestDispatcher("/register.jsp").forward(request, response);
            }
        }
    }
}
