package mil.army.moda.ratemyfirstline.leader;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Leader {
    @Id
    @GeneratedValue
    public Long id;
    private String fname;
    private String lname;
    private String jobTitle;

    public Leader() {
    }

    public Leader( String fname, String lname, String jobTitle) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.jobTitle = jobTitle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
}
