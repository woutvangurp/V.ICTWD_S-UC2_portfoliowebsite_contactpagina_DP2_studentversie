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
        public async Task<IActionResult> Index(string Name, string Email, string Subject, string Message)
        {

            //check als alles ingevuld is!!
            if (string.IsNullOrWhiteSpace(Name))
                throw new ArgumentNullException(nameof(Name));
            if (string.IsNullOrWhiteSpace(Email))
                throw new ArgumentNullException(nameof(Email));
            if (string.IsNullOrWhiteSpace(Subject))
                throw new ArgumentNullException(nameof(Subject));
            if (string.IsNullOrWhiteSpace(Message))
                throw new ArgumentNullException(nameof(Message));


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
