#include <iostream>
#include <vector>
#include <string>
#include<bits/stdc++.h>
#include <algorithm>
#include <random>

using namespace std ;

// Define constants
const int POPULATION_SIZE = 6;
const int GENERATIONS = 6;
const float MUTATION_RATE = 0.1;
const int DAYS_IN_WEEK = 6;
const int PERIODS_PER_DAY = 6;

// Define subjects and teachers
vector<pair<string , int>> subjects = {{"WT",3}, {"DSBDA",3}, {"AI",3}, {"CC",3}, {"Temp1" , 70}};
vector<string> teachers = {"Mr. Smith", "Ms. Johnson", "Mr. Brown", "Ms. Davis", "Mr. Wilson"};


// Structure to represent a timetable
struct Timetable {
    vector<vector<pair<string, string>>> schedule; // (Subject, Teacher) pairs for each period
    int fitness; // Fitness value
};

// Generate a random timetable
Timetable generateRandomTimetable() {
    Timetable timetable;
    for (int day = 0; day < DAYS_IN_WEEK; ++day) {

        vector< pair<string, string>> dailySchedule;
        vector<int>temp ;
        cout<<"Wttg"<<endl<<endl<<endl ;
        for (int period = 0; period < PERIODS_PER_DAY; ++period) {

            string subject = "wfa";
            int random = rand() % subjects.size() ;
            cout<<"srvasv"<<temp.size()<<endl ;

            if(temp.size()==subjects.size())
            {
                temp.clear() ;
            }

            //    int x = 3 ;
            while (( (subjects[random].second < 0) || (find(temp.begin() , temp.end() , random)!=temp.end())  )  )
            {
                // cout<<random<<" "; 
                if(subjects[random].second < 0)
                {
                    temp.push_back(random) ;

                }
                if(temp.size()==subjects.size())
                {
                    temp.clear() ;
                }
                // cout<<"era"<<subjects[random].second <<endl ;
                random = rand() % subjects.size() ;
            }

            temp.push_back(random) ;
            cout<<"ran"<<random<<endl ;
            subject = subjects[random].first ;
            subjects[random].second-- ;
            
            string teacher = teachers[rand() % teachers.size()];
            dailySchedule.push_back(make_pair(subject, teacher));
        }
        timetable.schedule.push_back(dailySchedule);
    }
    return timetable;
}

// Calculate fitness of a timetable (for now, just count clashes)
int calculateFitness(const Timetable& timetable) {

    int clashes = 0;
    vector<vector<bool>> subjectsAssigned(subjects.size(), vector<bool>(teachers.size(), false));

    for (const auto& dailySchedule : timetable.schedule) {
        for (const auto& slot : dailySchedule) {
            int subjectIndex =-1 ;
            cout<<slot.first<<endl ;
            for(int  i =0  ; i<subjects.size() ; i++ )
            {

                if(slot.first==subjects[i].first)
                {

                    subjectIndex = i ;
                    break;
                }
            }
            cout<<subjectIndex<<endl ;
            int teacherIndex = find(teachers.begin(), teachers.end(), slot.second) - teachers.begin();

            if (subjectsAssigned[subjectIndex][teacherIndex]) {
                clashes++;
            } else {
                subjectsAssigned[subjectIndex][teacherIndex] = true;
            }
        }
    }

    return clashes;
}

// Perform crossover between two timetables
Timetable crossover(const Timetable& timetable1, const Timetable& timetable2) {
    Timetable newTimetable;
    for (int day = 0; day < DAYS_IN_WEEK; ++day) {
        vector<pair<string, string>> dailySchedule;
        for (int period = 0; period < PERIODS_PER_DAY; ++period) {
            const Timetable& parent = (rand() / (float)RAND_MAX < 0.5) ? timetable1 : timetable2;
            dailySchedule.push_back(parent.schedule[day][period]);
        }
        newTimetable.schedule.push_back(dailySchedule);
    }
    return newTimetable;
}

// Perform mutation on a timetable
void mutate(Timetable& timetable) {
    int mutateDay = rand() % DAYS_IN_WEEK;
    int mutatePeriod = rand() % PERIODS_PER_DAY;
    timetable.schedule[mutateDay][mutatePeriod].first = subjects[rand() % subjects.size()].first;
    timetable.schedule[mutateDay][mutatePeriod].second = teachers[rand() % teachers.size()];
}

// Evolve the population
void evolve(vector<Timetable>& population) {
    // Select individuals for crossover based on their fitness
    sort(population.begin(), population.end(), [](const Timetable& a, const Timetable& b) {
        return calculateFitness(a) < calculateFitness(b);
    });

    int selectedCount = 0;
    vector<Timetable> selected;
    for (const auto& timetable : population) {
        if (selectedCount++ < 0.2 * POPULATION_SIZE) {
            selected.push_back(timetable);
        } else {
            break;
        }
    }

    // Perform crossover and mutation to create new generation
    vector<Timetable> newGeneration = selected;
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

void print( Timetable& population)
{
    cout << "Timetable:" << endl;
    for (int day = 0; day < DAYS_IN_WEEK; ++day) {
        cout << "Day " << day + 1 << ":" << endl;
        for (int period = 0; period < PERIODS_PER_DAY; ++period) {
            cout << "Period " << period + 1 << ": " << population.schedule[day][period].first << " - "
                      << population.schedule[day][period].second << endl;
        }
    }
}

// Main function to run genetic algorithm
void runGeneticAlgorithm() {
    // Generate initial population
    vector<Timetable> population;
    for (int i = 0; i < POPULATION_SIZE; ++i) {
        cout<<"wv"<<endl ;
        population.push_back(generateRandomTimetable());
        print(population.back()) ;
    }


    // Evolve population over multiple generations
    // for (int generation = 1; generation <= GENERATIONS; ++generation) {
    //     evolve(population);

    //     sort(population.begin(), population.end(), [](const Timetable& a, const Timetable& b) {
    //         return calculateFitness(a) < calculateFitness(b);
    //     });
    //     cout << "Generation " << generation << ": Best Fitness = " << calculateFitness(population[0]) << endl;
    // }


    // Print final timetable
    // cout << "Final Timetable:" << endl;
    // for (int day = 0; day < DAYS_IN_WEEK; ++day) {
    //     cout << "Day " << day + 1 << ":" << endl;
    //     for (int period = 0; period < PERIODS_PER_DAY; ++period) {
    //         cout << "Period " << period + 1 << ": " << population[0].schedule[day][period].first << " - "
    //                   << population[0].schedule[day][period].second << endl;
    //     }
    // }
}



int main() {
    srand(time(0)); // Seed the random number generator
    cout<<"rg"<<endl ;
    runGeneticAlgorithm();
    return 0;
}


