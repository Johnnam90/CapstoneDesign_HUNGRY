package com.bac.stats;

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

import com.bac.posting.PostingDao;

//import com.bac.posting.PostingDao;

public class StatsServlet extends HttpServlet{

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

		PostingDao dao = new PostingDao();

		try{
			JObject.put("result", dao.getPosting());


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
		String type=request.getParameter("type");

		PostingDao dao = new PostingDao();
		

		
		try{
			if(type.equals("1")){
				Map<String, String[]> postingParam = request.getParameterMap();
			
				JObject.put("result", dao.postPosting(postingParam));
			}else if(type.equals("2")){
				String seq=request.getParameter("seq");
				String content=request.getParameter("content");
				
				JObject.put("result", dao.updatePosting(seq, content));
				
			}
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}

	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//DELETE

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();

		PostingDao dao = new PostingDao();
		
		String seq = request.getParameter("seq");

		
		try{
			JObject.put("result", dao.deletePosting(seq));
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}

}