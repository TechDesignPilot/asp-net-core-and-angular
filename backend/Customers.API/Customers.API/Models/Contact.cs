using System;
using System.Collections.Generic;

namespace Customers.API.Models;

public partial class Contact
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public int CompanyId { get; set; }

    public virtual Company? Company { get; set; } = null!;
}
