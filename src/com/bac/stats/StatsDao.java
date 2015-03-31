package com.bac.stats;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StatsDao {
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://54.64.160.105:3306/AYH";

	static final String USER = "root";
	static final String PASS = "900418";
	
	/**
	 * 커넥션 공동 메소드
	 * @returna
	 * @throws ClassNotFoundException
	 */
	public Connection getConnection() throws ClassNotFoundException{
		Connection dbConn = null;
		
		try{
			Class.forName(JDBC_DRIVER);
			dbConn = DriverManager.getConnection(DB_URL,USER,PASS);
			
		}catch(SQLException e){
			e.printStackTrace();
		}
		return dbConn;
	}
	public String postLogin(Map<String, String[]> postingParam){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";

		try{
			conn = getConnection();

			stmt = conn.createStatement();
			String sql= "INSERT INTO posting (content, writer, regdate) "+
						"VALUES('"+postingParam.get("content")[0].toString()+"','"+postingParam.get("writer")[0].toString()+"', now())";

			stmt.executeUpdate(sql);

			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
			result = "fail";
		}catch(Exception e){
			e.printStackTrace();
			result = "fail";
		}finally{
			
		}
		return result;
	}
	
	public List<HashMap<String, Object>> getStatsMaxPointFromMe(){
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			String sql ="SELECT seq, content, AVG(point) AS avg FROM comment "+
						"WHERE writer = '"+"User1"+"' "+
						"GROUP BY posting_seq "+
						"ORDER BY avg DESC ";
			
			ResultSet rs = stmt.executeQuery(sql);
			
			while(rs.next()){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.put("seq", rs.getString("seq"));
				item.put("content", rs.getString("content"));
				item.put("avg", rs.getString("avg"));
				result.add(item);
			}

			rs.close();
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
		}
		return result;
	}
	
	public List<HashMap<String, Object>> getStatsLoginPointFromMe(){
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			String sql = "SELECT regdate, COUNT(*) AS access_cnt FROM login"+
						 "WHERE user = 'user1' "+
						 "GROUP BY DATE(regdate) AS day "+
						 "ORDER BY regdate DESC ";
			
			ResultSet rs = stmt.executeQuery(sql);
			
			while(rs.next()){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.put("regdate", rs.getString("regdate"));
				item.put("access_cnt", rs.getString("access_cnt"));
				result.add(item);
			}

			rs.close();
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
		}
		return result;
	}

}//end FirstExample
