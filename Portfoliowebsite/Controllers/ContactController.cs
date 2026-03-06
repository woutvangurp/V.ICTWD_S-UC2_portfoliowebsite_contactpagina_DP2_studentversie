using Microsoft.AspNetCore.Mvc;
using Portfoliowebsite.Services;

namespace Portfoliowebsite.Controllers
{
    public class ContactController : Controller
    {

        private readonly IEmailSender _email;
        public ContactController(IEmailSender email) => _email = email;

        public IActionResult Index() => View();

        [HttpPost]
        public async Task<IActionResult> Index(string Name, string Email, string Subject, string Message, string website)
        {
            if (!string.IsNullOrEmpty(website))
            {
                TempData["ThanksName"] = Name;
                TempData["ThanksEmail"] = Email;
                TempData["ThanksMessage"] = Message;

                return RedirectToAction(nameof(Thanks));
            }
            if (string.IsNullOrWhiteSpace(Name) || string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Subject) || string.IsNullOrWhiteSpace(Message))
            {
                TempData["Error"] = "Vul alstublieft alle velden in.";
                return View();
            }

            await _email.SendAsync(Name, Email, Subject, Message);

            TempData["ThanksName"] = Name;
            TempData["ThanksEmail"] = Email;
            TempData["ThanksMessage"] = Message;

            return RedirectToAction(nameof(Thanks));
        }

        public IActionResult Thanks()
        {
            return View();
        }
    }
}
