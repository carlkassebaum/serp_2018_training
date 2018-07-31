using System;
using System.Text;

public class TextInput 
{
    protected StringBuilder builder;
    
    public TextInput()
    {
        builder = new StringBuilder();
    }
    
    public virtual void Add(char c)
    {
        builder.Append(c);
    }
    
    public string GetValue()
    {
        return builder.ToString();  
    }
}

public class NumericInput : TextInput 
{
    public override void Add(char c)
    {
        if(Char.IsDigit(c))
            builder.Append(c);
    }
}

public class UserInput
{
    public static void Training()
    {
        TextInput input = new NumericInput();
        input.Add('1');
        input.Add('a');
        input.Add('0');
        Console.WriteLine(input.GetValue());
    }
}