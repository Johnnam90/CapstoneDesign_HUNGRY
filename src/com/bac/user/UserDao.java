package com.bac.user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserDao {
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

	public HashMap<String, Object> getUser(String id) {
		Connection conn = null;
		Statement stmt = null;
		HashMap<String, Object> result = new HashMap<String, Object>();
		System.out.println("Fron Ajax!!");
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql ="SELECT * FROM user where id='"+id+"'";
			ResultSet rs = stmt.executeQuery(sql);

			while(rs.next()){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.put("id", rs.getString("id"));
				item.put("pass", rs.getString("pass"));
				item.put("name", rs.getString("name"));
				item.put("regdate", rs.getString("regdate"));
				item.put("thumb",rs.getString("thumb"));
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
	
	public HashMap<String, Object> loginUser(String id, String pass) {
		Connection conn = null;
		Statement stmt = null;
		HashMap<String, Object> result = new HashMap<String, Object>();
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql ="SELECT * FROM user WHERE id = '"+id+"' AND pass = '"+pass+"'";
			ResultSet rs = stmt.executeQuery(sql);

			while(rs.next()){
				//HashMap<String, Object> item = new HashMap<String, Object>();
				result.put("id", rs.getString("id"));
				result.put("pass", rs.getString("pass"));
				result.put("name", rs.getString("name"));
				result.put("regdate", rs.getString("regdate"));
				result.put("thumb", rs.getString("thumb"));
				
				//result.add(item);
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

	
	public String deleteUser(String userId){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";

		try{
			conn = getConnection();

			stmt = conn.createStatement();
			String sql= "DELETE from user where id='"+userId+"'";
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
	
	public String postUser(Map<String, String[]> userParam){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		try{
			conn = getConnection();

			stmt = conn.createStatement();
			String sql= "INSERT INTO user (id, pass, name, regdate,thumb) "+
						"VALUES('"+userParam.get("id")[0].toString()+"', '"+userParam.get("pass")[0].toString()+"', '"+userParam.get("name")[0].toString()+"', now(), '1')";

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
	
//end FirstExample
	
	public String updateUser(String id, String name, String pass){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql= "UPDATE user SET name='"+name+"', pass='"+pass+"' where id='"+id+"'";
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
	
	public int checkUser(String userId){	
		Connection conn =null;
		Statement stmt = null;
		String sql="";
		int result=0;
		try{
			conn=getConnection();
			stmt=conn.createStatement();
			
			sql="select * from user where id='"+userId+"'";
			ResultSet rs = stmt.executeQuery(sql);
			
			if(rs.next()){
				result=1;
				}
			
			rs.close();
			stmt.close();
			conn.close();
		}catch(SQLException se){
			se.printStackTrace();
			result = 0;
		}catch(Exception e){
			e.printStackTrace();
			result = 0;
		}finally{
			
		}  
			return result;
	}

}