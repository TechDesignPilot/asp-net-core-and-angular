using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Customers.API.Models;

namespace Customers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly CustomersContext _context;

        public CompaniesController(CustomersContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            var company = await _context.Companies.Where(c => c.Id == id)
                .Include(c => c.Address)
                .Include(c => c.Contacts)
                .FirstOrDefaultAsync();

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {            
            // retrieve company info
            Company currentCompany = await _context.Companies.Where(c => c.Id == id).Include(c => c.Address).Include(c => c.Contacts).FirstOrDefaultAsync();

            // patch company name
            currentCompany.Name = company.Name;

            // edit the address
            currentCompany.Address.StreetNumber = company.Address.StreetNumber;
            currentCompany.Address.StreetName = company.Address.StreetName;
            currentCompany.Address.AddressLine2 = company.Address.AddressLine2;
            currentCompany.Address.City = company.Address.City;
            currentCompany.Address.State = company.Address.State;
            currentCompany.Address.Country = company.Address.Country;

            // delete the current contacts, and add the new ones from edit
            if (company.Contacts.Any())
            {
                _context.Contacts.RemoveRange(currentCompany.Contacts);
            }            
            await _context.SaveChangesAsync();

            currentCompany.Contacts = company.Contacts;
            foreach(var contact in currentCompany.Contacts)
            {
                contact.Id = 0;
            }
            _context.Entry(currentCompany).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Companies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = company.Id }, company);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}
