import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Set;
import java.util.Collection;
import java.util.ListIterator;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Arrays;

public class Part2 {
   public static void main(String[] args) {
      ArrayList<String> input = readInput();
      //System.out.println(input.toString());

      String result = filterCorrectBoxIds(input);
      System.out.println("Result: " + result);
   }

   private static String filterCorrectBoxIds(ArrayList<String> list) {
      int distance;
      String string1, string2;

      ListIterator<String> listIteratorOuter, listIteratorInner;
      listIteratorOuter = list.listIterator();

      //Set<String> result = new Set<String>;
      Set<String> result = new LinkedHashSet<String>(); //LinkedHashSet to keep order

      while(listIteratorOuter.hasNext()) {
         //get a listerator for the elements that is in front in the array of the outer listiterator

         string1 = listIteratorOuter.next();
         listIteratorInner = list.listIterator(listIteratorOuter.nextIndex()); 

         while(listIteratorInner.hasNext()) {
            string2 = listIteratorInner.next();
            distance = Levenshtein.distance(string1, string2);

            if(distance == 1) {
               /*System.out.println("String1: " + string1);
               System.out.println("String2: " + string2);
               System.out.println("distance: " + distance);*/

               //iniatate a stringbuilder and delete the char at the position they differ and return the string
               StringBuilder sb = new StringBuilder(string1);

               for(int a = 0; a < sb.length(); a++) {
                  if(sb.charAt(a) != string2.charAt(a)) {
                     sb.deleteCharAt(a);
                     return sb.toString();
                  }      
               }

               return null; //not found so something went wrong
            }
           
         }
      }

      return "hej";      
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