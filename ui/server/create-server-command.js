/**
 * Server Creation Command
 *
 * This command is used to create servers by automation.
 *
 * This command takes server details and creates a new server based on the given parameters
 *
 *
 * @location
 * Login > Add New
 *
 * @params
 * @param serverType    // A variable containing the server type to select
 * @param serverDatabase   // An variable containing the type of database
 * @param serverName  // A variable containing server name and information
 * @param serverDescription // An variable containing server description
 * @param startServerAutomatically // A boolean value to check whether the server start automatically or not
 * @param enableManualConfiguration  // A boolean value to check to manually configure directory locations
 * @param isFTP // A boolean value to allow FTP service
 * @param isFTPS // A boolean value to allow FTPS service
 * @param isSSH // A boolean value to allow SSH service
 * @param isHTTP // A boolean value to allow HTTP service
 * @param isWEBDAV // A boolean value to allow WebDAV service
 * @param enableFTP // A boolean value to enable FTP services
 * @param FTPIp // A variable to select IP address
 * @param FTPPort // A variable to select port number
 * @param FTPFirewallCheck //A boolean value to check if a firewall is enabled
 * @param enableExplicitFTPS // A boolean value to enable  Explicit FTPS services
 * @param enableImplicitFTPS // A boolean value to enable Implicit FTPS services
 * @param TLSVersion // A variable to select TLS version
 * @param enableFIPS // A boolean value to enable FIPS Compilance
 * @param enableCertificates // A boolean value to enable Certificate
 * @param enableSFTP // A boolean value to enable SFTP
 * @param selectSFTPVersion // A variable to select SFTP version
 * @param SFTPIp // A variable to select SFTP IP
 * @param SFTPPort // A variable to select SFTP port
 * @param enableFIPSForSFTP // A boolean value to enable FIPS for SFTP
 * @param kickUser // A boolean value to kick user in SFTP configuration
 * @param enableHTTP // A boolean value to enable HTTP Browser interface
 * @param HTTPIp // A variable to select HTTP IP
 * @param HTTPPort // A variable to select HTTP port
 * @param enableHTTPS // A boolean value to enable HTTPS
 * @param HTTPSIp // A variable to select HTTPS IP
 * @param HTTPSPort // A variable to select HTTPS port
 * @param enableFIPSForHTTPS // A boolean value to enable FIPS for HTTPS
 * @param enableCertificatesForHTTPS // A boolean value to enable certificates for HTTPS
 * @param enableWEBDAV // A boolean value to enable webDAV service
 * @param WEBDAVIp // A variable to select webDAV IP
 * @param WEBDAVPort // A variable to select webDAV port
 * @param enableWEBDAVS // A boolean value to enable WEBDAVS
 * @param WEBDAVSIp // A variable to select WEBDAVS IP
 * @param WEBDAVSPort // A variable to select WEBDAVS port
 * @param enableFIPSForWEBDAVS // A boolean value to enable FIPS for WEBDAVS
 * @param SMTPServerName // A variable containing SMTP server hostname or IP
 * @param SMTPPort // A variable containing SMTP port
 * @param serverUsername // A variable containing server username
 * @param serverPassword // A variable containing server password
 * @param defaultFromAddress // A variable containing default from address
 * @param enableSecureConnection // A boolean value to enable secure connection
 * @param SMSEndpoint // A variable containing the SMS endpoint
 * @param SMSAccessKey // A variable containing the SMS Access Key
 * @param SMSPhoneNumber // A variable containing the SMS phone number
 *
 * @example
 * cy.visit(assignmentListPage);
 * cy.createManualAssignment(assignmentDetails, assignmentContent, learners, communications, advancedSettings);
 *
 * @sample
const assignmentDetails = {
    assignmentName: "",
    trainingPeriod: "",
    startDate: "YYYY/MM/DD",
    endDate: "YYYY/MM/DD",
    dueDate: "YYYY/MM/DD"  // For manual assignments
    dueDuration: "YYYY/MM/DD",  // for dynamic assignments
    archiveDate: "YYYY/MM/DD"
};
const assignmentContent = [];
const learners = [];
const communications = {
    invitations: true,
    reminders: true,
    pastDueReminders: true,
    pastDueReminderInterval: 'Two weeks'
};
const advancedSettings = {
    sendSurveys: false
    sendSupplemental: false
};
 *
 */
