using System;

public class Palindrome
{
    public static bool IsPalindrome(string word)
    {
        for(var i = 0; i < word.Length/2; i++)
        {
            if(Char.ToLower(word[i]) != Char.ToLower(word[word.Length-1-i]))
                return false;
        }
    
        return true;
    }

    public static void Test()
    {
        Console.WriteLine(Palindrome.IsPalindrome("Deleveled"));
        Console.WriteLine(Palindrome.IsPalindrome("mytesttsetym"));
        Console.WriteLine(Palindrome.IsPalindrome("not_palindrome"));
    }
}
