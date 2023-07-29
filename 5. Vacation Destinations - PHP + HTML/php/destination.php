<?php

class Destination implements JsonSerializable
{
    private $id;
    private $location;
    private $country;
    private $description;
    private $tourist_targets;
    private $cost;

    function __construct($id, $location, $country, $description, $tourist_targets, $cost)
    {
        $this->id = $id;
        $this->location = $location;
        $this->country = $country;
        $this->description = $description;
        $this->tourist_targets = $tourist_targets;
        $this->cost = $cost;
    }

    public function get_id()
    {
        return $this->id;
    }

    public function set_id($newId): void
    {
        $this->id = $newId;
    }

    public function get_location()
    {
        return $this->location;
    }

    public function set_location($newLocation): void
    {
        $this->location = $newLocation;
    }

    public function get_country()
    {
        return $this->country;
    }

    public function set_country($newCountry): void
    {
        $this->country = $newCountry;
    }

    public function get_description()
    {
        return $this->description;
    }

    public function set_description($newDescription): void
    {
        $this->description = $newDescription;
    }

    function get_tourist_targets()
    {
        return $this->tourist_targets;
    }

    public function set_tourist_targets($newTouristTargets): void
    {
        $this->tourist_targets = $newTouristTargets;
    }

    public function get_cost()
    {
        return $this->cost;
    }

    public function set_cost($newCost): void
    {
        $this->cost = $newCost;
    }

    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
}
