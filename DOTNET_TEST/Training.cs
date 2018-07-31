using System;
using System.Collections.Generic;

namespace dotnet_test
{
    public class Vegetable
    {
        public Vegetable(string name) => Name = name;

        public string Name { get; }

        public override string ToString() => Name;
    }

    public class Training
    {
         public static void stringInterp()
        {
            var name = "Carl";
            var my_string = $"Hello, {name}. It's a pleasure to meet you!";
            Console.WriteLine(my_string);
        }

        public static void StringFormat()
        {
            var titles = new Dictionary<string, string>()
            {
                ["Doyle, Arthur Conan"] = "Hound of the Baskervilles, The",
                ["London, Jack"] = "Call of the Wild, The",
                ["Shakespeare, William"] = "Tempest, The"
            };

            Console.WriteLine("Author and Title List");
            Console.WriteLine();
            Console.WriteLine($"|{"Author",-25}|{"Title",30}|");
            foreach (var title in titles)
                Console.WriteLine($"|{title.Key,-25}|{title.Value,30}|");            
        }

        public static void doMaths()
        {
            int a = 5;
            int b = 4;
            int c = 2;
            int d = a + b * c;
            Console.WriteLine(d);

            int max = int.MaxValue;
            int min = int.MinValue;
            Console.WriteLine($"The range of integers is {min} to {max}");            
        }

        public static void useLists()
        {
            var names = new List<string> { "<name>", "Ana", "Felipe" };
            foreach (var name in names)
            {
                Console.WriteLine($"Hello {name.ToUpper()}!");
            }
            Console.WriteLine();
            names.Add("Maria");
            names.Add("Bill");
            names.Remove("Ana");
            foreach (var name in names)
            {
                Console.WriteLine($"Hello {name.ToUpper()}!");
            }
            Console.WriteLine($"My name is {names[0]}");
            Console.WriteLine($"I've added {names[2]} and {names[3]} to the list");
            Console.WriteLine($"The list has {names.Count} people in it");
        }

        public static void runTraining()
        {
            Console.WriteLine("Hi!");
            doMaths();
            stringInterp();
            StringFormat();
            useLists();

            var account = new BankAccount("<name>", 1000);
            Console.WriteLine($"Account {account.Number} was created for {account.Owner} with {account.Balance} initial balance.");

            account.MakeWithdrawal(500, DateTime.Now, "Rent payment");
            Console.WriteLine(account.Balance);
            account.MakeDeposit(100, DateTime.Now, "friend paid me back");
            Console.WriteLine(account.Balance);

            Console.WriteLine(account.GetAccountHistory());

            try
            {
                var invalidAccount = new BankAccount("invalid", -55);
            }
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("Exception caught creating account with negative balance");
                Console.WriteLine(e.ToString());
            }

        }
    }
    
}