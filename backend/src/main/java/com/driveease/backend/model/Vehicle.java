package com.driveease.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "VEHICLE")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "vehicle_seq")
    @SequenceGenerator(name = "vehicle_seq", sequenceName = "seq_vehicle", allocationSize = 1)
    @Column(name = "V_ID")
    private Long vId;

    @Column(name = "VEHICLE_NAME")
    private String vehicleName;

    @Column(name = "MODEL")
    private String model;

    @Column(name = "REGISTRATION_NO")
    private String registrationNo;

    @Column(name = "MANUFACTURING_YEAR")
    private Integer manufacturingYear;

    @Column(name = "PRICE_PER_DAY")
    private Double pricePerDay;

    @Column(name = "AVAILABILITY_STATUS")
    private String availabilityStatus;

    // --- Standard Getters ---
    public Long getVId() { return vId; }
    public String getVehicleName() { return vehicleName; }
    public String getModel() { return model; }
    public String getRegistrationNo() { return registrationNo; }
    public Integer getManufacturingYear() { return manufacturingYear; }
    public Double getPricePerDay() { return pricePerDay; }
    public String getAvailabilityStatus() { return availabilityStatus; }

    // --- Standard Setters ---
    public void setVId(Long vId) { this.vId = vId; }
    public void setVehicleName(String vehicleName) { this.vehicleName = vehicleName; }
    public void setModel(String model) { this.model = model; }
    public void setRegistrationNo(String registrationNo) { this.registrationNo = registrationNo; }
    public void setManufacturingYear(Integer manufacturingYear) { this.manufacturingYear = manufacturingYear; }
    public void setPricePerDay(Double pricePerDay) { this.pricePerDay = pricePerDay; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }
}