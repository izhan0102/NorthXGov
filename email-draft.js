function createEmailDraft(data) {
    // Prepare email content
    const subject = `New Consultation Request - ${data.firstName} ${data.lastName} (${data.company})`;
    
    const emailBody = `
Dear Aadil,

A new consultation request has been submitted through the NorthxGov website. Here are the details:

CONTACT INFORMATION:
• Name: ${data.firstName} ${data.lastName}
• Company: ${data.company}
• Phone: ${data.phone}
• Preferred Contact Method: ${data.contactMethod.charAt(0).toUpperCase() + data.contactMethod.slice(1)}
${data.email ? `• Email: ${data.email}` : ''}

SERVICE DETAILS:
• Service Needed: ${getServiceName(data.projectType)}

PROJECT DESCRIPTION:
${data.message}

NEXT STEPS:
Please reach out to the client via their preferred contact method (${data.contactMethod}) within 2 business hours as promised on the website.

Best regards,
NorthxGov Website Contact Form
    `.trim();
    
    // Create Gmail URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aadi.latief@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message and open Gmail
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Opening Gmail...</span>';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Open Gmail in new tab
        window.open(gmailUrl, '_blank');
        
        // Show success message
        alert('Thank you! Your consultation request has been prepared. Gmail will open with your details ready to send to our team.');
        
        // Reset form
        contactForm.reset();
        document.getElementById('emailGroup').style.display = 'none';
        document.getElementById('email').required = false;
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1000);
}

function getServiceName(projectType) {
    const serviceNames = {
        'proposal': 'Proposal Development',
        'capture': 'Capture & Opportunity Assessment',
        'capability': 'Past Performance & Capability Statements',
        'development': 'Capability Development',
        'website': 'Website Development',
        'pr': 'Public Relations Support',
        'consultation': 'General Consultation'
    };
    
    return serviceNames[projectType] || projectType;
}