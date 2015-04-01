package com.bac.comment;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.bac.comment.CommentDao;

//import com.bac.comment.CommentDao;

public class CommentServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	/**
	 * Select 쿼리를 위한 Ajax GET 핸들러
	 * type=1 : all
	 * type=2 : login
	 * login시 결과값은 success or fail
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//READ

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();
		//String type = request.getParameter("type");

		CommentDao dao = new CommentDao();

		try{
			JObject.put("result", dao.getComment());
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		printout.print(JObject);
		printout.flush();
	}
	
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//CREATE

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();

		CommentDao dao = new CommentDao();
		
		Map<String, String[]> commentParam = request.getParameterMap();

		
		try{
			JObject.put("result", dao.postComment(commentParam));
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}

	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//CREATE

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();

		CommentDao dao = new CommentDao();
		
		String seq = request.getParameter("seq");

		
		try{
			JObject.put("result", dao.deleteComment(seq));
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}

}