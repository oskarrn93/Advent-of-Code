import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Set;
import java.util.Collection;
import java.util.HashMap;

public class Part1 {
   public static void main(String[] args) {
      ArrayList<String> input = readInput();
      //System.out.println(input.toString());

      int result = countChars(input);
      System.out.println("Result: " + result);
   }

   private static int countChars(ArrayList<String> list) {
      int counterTwo = 0;
      int counterThree = 0;
      HashMap<Character, Integer> hashmap;
      int counter = 0;
      char c;
      Set<Character> keys;

      boolean alreadyContainsTwo = false;
      boolean alreadyContainsThree = false;

      for(String input : list) {
         //System.out.println(input);
         hashmap = new HashMap<Character, Integer>(26); //seems to be each line is 26 chars
         
         for(int a = 0; a < input.length(); a++) {
            c = input.charAt(a);
            //System.out.println("char: " + c);
            counter = hashmap.getOrDefault(c, 0);
            counter++;
            hashmap.put(c, counter);
         }

         keys = hashmap.keySet();

         //System.out.println(keys);

         alreadyContainsTwo = false;
         alreadyContainsThree = false;

         for(char key : keys) {
            counter = hashmap.getOrDefault(key, 0);
            //System.out.println("Key: " + key + "\nValue: " + counter + "\n");
            if(counter == 2 && !alreadyContainsTwo) {
               alreadyContainsTwo = true;
               counterTwo++;
            }
            else if(counter == 3 && !alreadyContainsThree) {
               alreadyContainsThree = true;
               counterThree++;
            }
         }  
      }

      int result = counterTwo * counterThree;

      //System.out.println("Nr of two: " + counterTwo);
      //System.out.println("Nr of three: " + counterThree); 

      return result;
   }

   private static ArrayList<String> readInput() {
      ArrayList<String> list = new ArrayList<String>();

      try {
         BufferedReader in = new BufferedReader(new FileReader("input.txt"));
         String tmp = null;

         while((tmp = in.readLine()) != null) {
            list.add(tmp);
         }
      }
      catch(Exception e) {
         System.err.println(e.getMessage());
         System.exit(1);
      }
      
      return list;
   }

}