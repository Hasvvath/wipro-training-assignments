using Microsoft.AspNetCore.Mvc;
using Fracto.API.Data;
using Fracto.API.Models;

namespace Fracto.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpecializationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SpecializationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetSpecializations()
        {
            var specializations = _context.Specializations.ToList();

            return Ok(specializations);
        }

        [HttpPost]
        public IActionResult AddSpecialization(Specialization specialization)
        {
            _context.Specializations.Add(specialization);
            _context.SaveChanges();

            return Ok(specialization);
        }
    }
}