#include <bits/stdc++.h>
using namespace std;

vector<int> SUB_ID({1, 2, 3, 4, 5}), TEACH_ID({1, 2, 3, 4}),
ROOM_ID({401, 402, 403, 502});
int slots_per_day = 6;
int days_per_weak = 5;
int no_of_divs = 4;

double standardDeviation(const std::unordered_map<int, int> &data)
{
    if (data.empty())
    {
        std::cerr << "Error: Input map is empty." << std::endl;
        return 0.0;
    }

    // Step 1: Calculate the mean
    double sum = 0.0;
    for (const auto &pair : data)
    {
        sum += pair.second;
    }
    double mean = sum / data.size();

    // Step 2: Calculate the sum of squares of differences from the mean
    double sqDiffSum = 0.0;
    for (const auto &pair : data)
    {
        double diff = pair.second - mean;
        sqDiffSum += diff * diff;
    }

    // Step 3: Calculate the variance
    double variance = sqDiffSum / data.size();

    // Step 4: Calculate the standard deviation
    double stdDev = std::sqrt(variance);

    return stdDev;
}

int random_num(int start, int end)
{
    if (start == end)
    {
        return -1;
    }
    if (end - start == 1)
    {
        return start;
    }
    int rnum = rand() % (end - start);
    return rnum + start;
}

class constraints
{
public:
    vector<vector<int>> teacher_sub_pair;
    vector<int> teacher_avail;
    constraints()
    {
        teacher_sub_pair = vector<vector<int>>({{1, 2, 3, 4, 5}, {1,
2, 3, 4, 5}, {1, 2, 3, 4, 5}, {1, 2, 3, 4, 5}});
        teacher_avail = vector<int>({1, 1, 1, 1, 1});
    }
    // parameters are the sub_idx and teach_idx
    bool isTeachable(int sub, int teach)
    {
        for (auto s : teacher_sub_pair[teach])
        {
            if (s == SUB_ID[sub])
            {
                return true;
            }
        }
        return false;
    }
    bool isTeacherAvail(int teach)
    {
        return teacher_avail[teach];
    }
};

constraints cnts;

class TTCell
{
public:
    int sub_id;
    int teach_id;
    int time_id;
    int day_id;
    int room_id;
    // bool isLab;
    TTCell()
    {
        time_id = day_id = 0;
    }

    TTCell(int tim, int day, vector<int> &TEACH_Local, vector<int> &ROOM_ID)
    {
        int temp;
        int teach_idx, sub_idx;
        // choose randomly teacher to be assigned
        temp = random_num(0, TEACH_Local.size());
        teach_id = temp == -1 ? -1 : TEACH_Local[temp];
        TEACH_Local.erase(TEACH_Local.begin() + temp);
        // get index of teacher from global teacher array
        for (int i = 0; i < TEACH_ID.size(); i++)
        {
            if (teach_id == TEACH_ID[i])
            {
                teach_idx = i;
            }
        }
        // find out the subject that can be tought by teacher
        sub_idx = random_num(0, SUB_ID.size());
        if (!cnts.isTeachable(sub_idx, teach_idx))
        {
            sub_idx = random_num(0, cnts.teacher_sub_pair[teach_idx].size());
            sub_id = sub_idx == -1 ? -1 :
cnts.teacher_sub_pair[teach_idx][sub_idx];
        }
        else
        {
            sub_id = sub_idx == -1 ? -1 : SUB_ID[sub_idx];
        }

        temp = random_num(0, ROOM_ID.size());
        room_id = temp == -1 ? -1 : ROOM_ID[temp];
        ROOM_ID.erase(ROOM_ID.begin() + temp);

        time_id = tim;
        day_id = day;
        // isLab = false;
    }
    TTCell(int s, int t, int tim, int d, int r)
    {
        sub_id = s;
        teach_id = t;
        time_id = tim;
        day_id = d;
        room_id = d;

        /// repeat for all division
        // isLab = l;
    }

    void createTTCell(int tim, int day)
    {
        int temp = random_num(0, SUB_ID.size());
        sub_id = SUB_ID[temp];
        // SUB_ID.erase(SUB_ID.begin() + temp);

        temp = random_num(0, TEACH_ID.size());
        teach_id = TEACH_ID[temp];
        // TEACH_ID.erase(TEACH_ID.begin() + temp);

        // temp = random_num(0, DAY_ID.size());
        // day_id = DAY_ID[temp];
        // DAY_ID.erase(DAY_ID.begin() + temp);

        temp = random_num(0, ROOM_ID.size());
        room_id = ROOM_ID[temp];
        // ROOM_ID.erase(ROOM_ID.begin() + temp);

        time_id = tim;
        day_id = day;
    }

    void getTeacherLoad(unordered_map<int, int> &teacher_load)
    {
        teacher_load[teach_id]++;
    }

    void printCell()
    {
        cout << "\t|sub: " << sub_id << "|teacher: " << teach_id <<
"|room: " << room_id << "|";
    }
};

class TTDivSet
{
public:
    vector<TTCell *> div;
    TTDivSet()
    {
        div = vector<TTCell *>(no_of_divs);
        for (int i = 0; i < no_of_divs; i++)
        {
            div[i] = NULL;
        }
    }
    TTDivSet(int tim, int day)
    {
        div = vector<TTCell *>(no_of_divs);
        vector<int> teach(TEACH_ID.begin(), TEACH_ID.end());
        vector<int> room(ROOM_ID.begin(), ROOM_ID.end());
        for (int i = 0; i < no_of_divs; i++)
        {
            div[i] = new TTCell(tim, day, teach, room);
        }
    }

    void printDivCell(int divs)
    {
        if (divs >= div.size() || div[divs] == NULL)
        {
            return;
        }
        div[divs]->printCell();
    }

    void getTeacherLoad(unordered_map<int, int> &teacher_load)
    {
        for (int i = 0; i < no_of_divs; i++)
        {
            div[i]->getTeacherLoad(teacher_load);
        }
    }
};

// individual timetable
class timetable
{
public:
    vector<vector<TTDivSet>> data;
    int hardfitness;
    int softfitness;
    timetable()
    {
        data = vector<vector<TTDivSet>>(slots_per_day,
vector<TTDivSet>(days_per_weak));
        hardfitness = INT_MAX;
        softfitness = INT_MAX;
    }

    void create()
    {
        for (int tim = 0; tim < slots_per_day; tim++)
        {
            for (int i = 0; i < days_per_weak; i++)
            {
                cout << "Generating for " << tim << " & " << i << endl;
                TTDivSet temp(tim, i);
                data[tim][i] = temp;
            }
        }
        cout << "Time table is created successfully !";
        calc_hfitness();
        calc_sfitness();
    }

    timetable mate(timetable t2)
    {
        timetable off;
        for (int tim = 0; tim < slots_per_day; tim++)
        {
            TTCell ttcelltemp;
            for (int i = 0; i < days_per_weak; i++)
            {
                int choice = random_num(0, 100);
                if (choice < 49)
                {
                    // choose from first parent
                    off.data[tim][i] = data[tim][i];
                }
                else if (choice < 98)
                {
                    // choose from second parent
                    off.data[tim][i] = t2.data[tim][i];
                }
                else
                {
                    // mutate
                    TTDivSet temp(tim, i);
                    off.data[tim][i] = temp;
                }
            }
        }
        off.calc_hfitness();
        return off;
    }

    void calc_hfitness()
    {
        unordered_map<int, int> teacher_load;
        for (int i = 0; i < slots_per_day; i++)
        {
            for (int j = 0; j < days_per_weak; j++)
            {
                data[i][j].getTeacherLoad(teacher_load);
            }
        }
        hardfitness = standardDeviation(teacher_load);
    }
    void calc_sfitness()
    {
        return;
    }

    void printForStudent();
};

void timetable::printForStudent()
{
    for (int div = 0; div < no_of_divs; div++)
    {
        cout << "Printing for div " << div << "\n";
        for (int tim = 0; tim < slots_per_day; tim++)
        {
            for (int day = 0; day < days_per_weak; day++)
            {
                data[tim][day].printDivCell(div);
            }
            cout << endl;
        }
        cout << "\n-----------------------------------------------\n";
    }
}

class dummy
{
public:
    bool operator()(const timetable &a, const timetable &b)
    {
        return a.hardfitness < b.hardfitness;
    }
};

int main()
{
    srand(time(0));
    timetable t1, t2;
    t1.create();
    t1.printForStudent();
    // t2.create();
    // cout << "Second timetable: ";
    // t2.printForStudent();
    // cout << "\n----------------------------Offspring time table:
// ---------------------------\n";
    // timetable off = t1.mate(t2);
    // off.printForStudent();
    // generating initial population:
    // vector<timetable> population(100, timetable());
    // for (int i = 0; i < 100; i++)
    // {
    //     population[i].create();
    // }
    // sort(population.begin(), population.end(), dummy());

    // cout << "least hardfitness: " << population[0].hardfitness;
    return 0;
}