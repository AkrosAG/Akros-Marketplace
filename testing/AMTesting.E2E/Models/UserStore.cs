using System.Text.Json;

public class UserStore 
{
    Dictionary<String, User> testusers;

    public UserStore()
    {
        testusers = LoadTestUsers();
    }

    public User GetUser(string email)
    {
        if(!testusers.TryGetValue(email, out var user))
        {
            throw new Exception($"Unable to find a testuser with email: {email}");
        }

        return user;
    }

    private Dictionary<String, User> LoadTestUsers()
    {
        var dictionary = new Dictionary<String, User>();
        using StreamReader r = new StreamReader("testusers.json");
        
        string json = r.ReadToEnd();
        List<User> users = JsonSerializer.Deserialize<List<User>>(json);

        foreach (var user in users)
            dictionary.Add(user.Email, user);

        return dictionary;
    }
}