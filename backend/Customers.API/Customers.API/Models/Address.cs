using System;
using System.Collections.Generic;

namespace Customers.API.Models;

public partial class Address
{
    public int Id { get; set; }

    public string StreetNumber { get; set; } = null!;

    public string StreetName { get; set; } = null!;

    public string? AddressLine2 { get; set; }

    public string City { get; set; } = null!;

    public string? State { get; set; }

    public string Country { get; set; } = null!;

    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();
}
