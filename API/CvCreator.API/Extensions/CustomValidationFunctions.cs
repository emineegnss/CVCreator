using System.Text;

namespace CvCreator.API.Extensions
{
    public static class CustomValidationFunctions
    {
        public static void ConvertTurkishCharsToEnglish(ref string username)
        {
            var turkishChars = new[] { 'ç', 'ğ', 'ı', 'ö', 'ş', 'ü' };
            var englishChars = new[] { 'c', 'g', 'i', 'o', 's', 'u' };

            if (string.IsNullOrEmpty(username))
                return;

            var stringBuilder = new StringBuilder();
            foreach (var character in username)
            {
                var index = Array.IndexOf(turkishChars, character);
                if (index > -1)
                {
                    stringBuilder.Append(englishChars[index]);
                }
                else
                {
                    stringBuilder.Append(character);
                }
            }
            username = stringBuilder.ToString();
        }
    }
}
