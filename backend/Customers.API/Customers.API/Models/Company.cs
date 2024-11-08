using System;
using System.Collections.Generic;

namespace Customers.API.Models;

public partial class Company
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int AddressId { get; set; }

    public virtual Address? Address { get; set; } = null!;

    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();
}
