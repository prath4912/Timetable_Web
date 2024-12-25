#include <iostream>
#include<bits/stdc++.h>
#include <vector>
#include <string>
#include <algorithm>
#include <random>

// Define constants
const int DAYS_IN_WEEK = 6;
const int PERIODS_PER_DAY = 6;
const int POPULATION_SIZE = 100;
const int GENERATIONS = 100;
const float MUTATION_RATE = 0.1;

// Define subjects, teachers, and periods
std::vector<std::string> subjects = {"Math", "Science", "English", "History", "Art"};
std::vector<std::string> teachers = {"Mr. Smith", "Ms. Johnson", "Mr. Brown", "Ms. Davis", "Mr. Wilson"};
std::vector<std::string> days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
std::vector<std::string> periods = {"Period 1", "Period 2", "Period 3", "Period 4", "Period 5", "Period 6"};

// Structure to represent a timetable
struct Timetable {
    std::vector<std::vector<std::pair<std::string, std::string>>> schedule; // (Subject, Teacher) pairs for each period
    int fitness; // Fitness value
};

// Generate a random timetable
Timetable generateRandomTimetable() {
    Timetable timetable;
    for (int day = 0; day < DAYS_IN_WEEK; ++day) {
        std::vector<std::pair<std::string, std::string>> daySchedule;
        for (int period = 0; period < PERIODS_PER_DAY; ++period) {
            std::string subject = subjects[rand() % subjects.size()];
            std::string teacher = teachers[rand() % teachers.size()];
            daySchedule.push_back(std::make_pair(subject, teacher));
        }
        timetable.schedule.push_back(daySchedule);
    }
    return timetable;
}

// Calculate fitness of a timetable (for now, just count clashes)
int calculateFitness(const Timetable& timetable) {
    int clashes = 0;
    for (const auto& daySchedule : timetable.schedule) {
        std::vector<bool> subjectsAssigned(subjects.size(), false);
        std::vector<bool> teachersAssigned(teachers.size(), false);

        for (const auto& slot : daySchedule) {
            int subjectIndex = std::find(subjects.begin(), subjects.end(), slot.first) - subjects.begin();
            int teacherIndex = std::find(teachers.begin(), teachers.end(), slot.second) - teachers.begin();
            
            if (subjectsAssigned[subjectIndex]) {
                clashes++;
            } else {
                subjectsAssigned[subjectIndex] = true;
            }

            if (teachersAssigned[teacherIndex]) {
                clashes++;
            } else {
                teachersAssigned[teacherIndex] = true;
            }
        }
    }
    return clashes;
}

// Perform crossover between two timetables
Timetable crossover(const Timetable& timetable1, const Timetable& timetable2) {
    Timetable newTimetable;
    for (int day = 0; day < DAYS_IN_WEEK; ++day) {
        std::vector<std::pair<std::string, std::string>> daySchedule;
        for (int period = 0; period < PERIODS_PER_DAY; ++period) {
            if (rand() % 2 == 0) {
                daySchedule.push_back(timetable1.schedule[day][period]);
            } else {
                daySchedule.push_back(timetable2.schedule[day][period]);
            }
        }
        newTimetable.schedule.push_back(daySchedule);
    }
    return newTimetable;
}

// Perform mutation on a timetable
void mutate(Timetable& timetable) {
    int mutateDay = rand() % DAYS_IN_WEEK;
    int mutatePeriod = rand() % PERIODS_PER_DAY;
    timetable.schedule[mutateDay][mutatePeriod].first = subjects[rand() % subjects.size()];
    timetable.schedule[mutateDay][mutatePeriod].second = teachers[rand() % teachers.size()];
}

// Evolve the population
void evolve(std::vector<Timetable>& population) {
    // Select individuals for crossover based on their fitness
    std::sort(population.begin(), population.end(), [](const Timetable& a, const Timetable& b) {
        return calculateFitness(a) < calculateFitness(b);
    });
    int selectedCount = 0;
    std::vector<Timetable> selected;
    for (const auto& timetable : population) {
        if (selectedCount++ < 0.2 * POPULATION_SIZE) {
            selected.push_back(timetable);
        } else {
            break;
        }
    }

    // Perform crossover and mutation to create new generation
    std::vector<Timetable> newGeneration = selected;
    while (newGeneration.size() < POPULATION_SIZE) {
        Timetable parent1 = selected[rand() % selected.size()];
        Timetable parent2 = selected[rand() % selected.size()];
        Timetable child = crossover(parent1, parent2);
        if (rand() / (float)RAND_MAX < MUTATION_RATE) {
            mutate(child);
        }
        newGeneration.push_back(child);
    }

    population = newGeneration;
}

// Main function to run genetic algorithm
void runGeneticAlgorithm() {
    // Generate initial population
    std::vector<Timetable> population;
    for (int i = 0; i < POPULATION_SIZE; ++i) {
        population.push_back(generateRandomTimetable());
    }

    // Evolve population over multiple generations
    for (int generation = 1; generation <= GENERATIONS; ++generation) {
        evolve(population);
        std::sort(population.begin(), population.end(), [](const Timetable& a, const Timetable& b) {
            return calculateFitness(a) < calculateFitness(b);
        });
        std::cout << "Generation " << generation << ": Best Fitness = " << calculateFitness(population[0]) << std::endl;
    }

    // Print final timetable
    std::cout << "Final Timetable:" << std::endl;
    for (int day = 0; day < DAYS_IN_WEEK; ++day) {
        std::cout << days[day] << ":" << std::endl;
        for (int period = 0; period < PERIODS_PER_DAY; ++period) {
            std::cout << periods[period] << ": " << population[0].schedule[day][period].first << " - " << population[0].schedule[day][period].second << std::endl;
        }
    }
}

int main() {
    srand(time(0)); // Seed the random number generator
    runGeneticAlgorithm();
    return 0;
}
