import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;

public class Part1 {
   public static void main(String[] args) {
      ArrayList<Integer> input = new ArrayList<Integer>();

      try {
         BufferedReader in = new BufferedReader(new FileReader("input.txt"));
         String tmp = null;
         while((tmp = in.readLine()) != null) {
            input.add(Integer.parseInt(tmp));
         }
      } catch (Exception e) {
         //TODO: handle exception
         System.err.println(e.getMessage());
         System.exit(1);
      }
         
      int frequency = 0;
      for (int tmp : input) {
         frequency += tmp;
      }

      System.out.println("Frequency is: " + frequency);
   }
}