import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

public class Part2 {

   private static int frequency = 0; //global counter for frequency
   public static void main(String[] args) {
      ArrayList<Integer> input = new ArrayList<Integer>();
      HashMap<Integer,Integer> hashmap = new HashMap<Integer,Integer>();

      //read input
      input = readInput(input);
      
      //add to the hashmap from the list and see if a frequency (key) already exists it will print the frequency and exit
      while(true) {
         hashmap = addToHashMap(input, hashmap);
      }
   }

   private static HashMap<Integer,Integer> addToHashMap(ArrayList<Integer> list, HashMap<Integer,Integer> hashmap) {
      int counter = 0;
      for (int tmp : list) {
         frequency += tmp;

         if(hashmap.containsKey(frequency)) {
            System.out.println("The list already contains frequency: " + frequency);
            System.exit(1);
         }

         try {
            counter = hashmap.getOrDefault(frequency, 0);
            counter++;
         }
         catch(Exception e) {
            System.err.println(e.getMessage());
            System.exit(1);
         }
         
         hashmap.put(frequency, counter);
      }

      return hashmap;
   }

   private static ArrayList<Integer> readInput(ArrayList<Integer> list) {
      try {
         BufferedReader in = new BufferedReader(new FileReader("input.txt"));
         String tmp = null;
         while((tmp = in.readLine()) != null) {
            list.add(Integer.parseInt(tmp));
         }
         in.close();
      } catch (Exception e) {
         System.err.println(e.getMessage());
         System.exit(1);
      }
      
      
      return list;
   }
}