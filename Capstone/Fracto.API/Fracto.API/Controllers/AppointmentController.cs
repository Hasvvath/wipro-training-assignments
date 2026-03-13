using Fracto.API.Data;
using Fracto.API.DTOs;
using Fracto.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments
                .Select(a => new
                {
                    appointmentId = a.AppointmentId,
                    userId = a.UserId,
                    doctorId = a.DoctorId,
                    appointmentDate = a.AppointmentDate,
                    timeSlot = a.TimeSlot,
                    status = a.Status,
                    doctorName = _context.Doctors
                        .Where(d => d.DoctorId == a.DoctorId)
                        .Select(d => d.Name)
                        .FirstOrDefault()
                })
                .ToList();

            return Ok(appointments);
        }

        [HttpPost("book")]
        public IActionResult BookDoctorAppointment([FromBody] BookAppointmentDto dto)
        {
            var allowedSlots = new Dictionary<string, int>
    {
        { "09:00", 10 },
        { "10:30", 20 },
        { "14:00", 20 },
        { "16:30", 20 },
        { "19:00", 20 }
    };

            if (!allowedSlots.ContainsKey(dto.TimeSlot))
                return BadRequest("Invalid time slot");

            var sameUserSameSlot = _context.Appointments.Any(a =>
                a.UserId == dto.UserId &&
                a.AppointmentDate.Date == dto.AppointmentDate.Date &&
                a.TimeSlot == dto.TimeSlot);

            if (sameUserSameSlot)
                return BadRequest("You already booked this slot for the day");

            var bookedCount = _context.Appointments.Count(a =>
                a.DoctorId == dto.DoctorId &&
                a.AppointmentDate.Date == dto.AppointmentDate.Date &&
                a.TimeSlot == dto.TimeSlot);

            if (bookedCount >= allowedSlots[dto.TimeSlot])
                return BadRequest("This slot is full");

            var appointment = new Appointment
            {
                UserId = dto.UserId,
                DoctorId = dto.DoctorId,
                AppointmentDate = dto.AppointmentDate,
                TimeSlot = dto.TimeSlot,
                Status = "Booked"
            };

            _context.Appointments.Add(appointment);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                message = "Appointment booked successfully"
            });
        }

        [HttpGet("slots/{doctorId}")]
        public IActionResult GetAvailableSlots(int doctorId)
        {
            var bookedSlots = _context.Appointments
                .Where(a => a.DoctorId == doctorId)
                .Select(a => a.TimeSlot)
                .ToList();

            return Ok(bookedSlots);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateAppointment(int id, [FromBody] Appointment updatedAppointment)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.AppointmentId == id);
            if (appointment == null)
                return NotFound("Appointment not found");

            if (!string.IsNullOrWhiteSpace(updatedAppointment.Status))
            {
                appointment.Status = updatedAppointment.Status;
            }

            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                message = "Appointment updated successfully"
            });
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteAppointment(int id)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.AppointmentId == id);
            if (appointment == null)
                return NotFound("Appointment not found");

            _context.Appointments.Remove(appointment);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                message = "Appointment deleted successfully"
            });
        }

    }
}
