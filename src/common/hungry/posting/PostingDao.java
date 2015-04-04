package common.hungry.posting;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostingDao {
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://localhost:3306/CD";

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

	public List<HashMap<String, Object>> getPosting() {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql ="Select * from posting";
			ResultSet rs = stmt.executeQuery(sql);
			
			while(rs.next()){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.put("seq", rs.getString("seq"));
				item.put("content", rs.getString("content"));
				item.put("writer", rs.getString("writer"));
				item.put("regdate", rs.getString("regdate"));
				//item.put("thumb", rs.getString("thumb"));
				//item.put("avg", rs.getString("avg"));
				
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
	

	public String postPosting(Map<String, String[]> postingParam){
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
	
	public String deletePosting(String seq){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";

		try{
			conn = getConnection();

			stmt = conn.createStatement();
			String sql= "DELETE from posting where seq='"+seq+"'";
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
	
	public String updatePosting(String seq, String content){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql= "UPDATE posting SET content='"+content.toString()+"' where seq='"+seq+"'";
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
	
//파일처리 
//	public void postImg(){
//		MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit,"euc-kr",  new DefaultFileRenamePolicy());
//	}
}//end FirstExample
