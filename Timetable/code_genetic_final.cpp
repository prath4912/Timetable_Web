#include <bits/stdc++.h>
using namespace std;

// array of pairs of subject and corresponding hrs
vector<pair<int, int>> SUB_ID({{1, 3}, {2, 3}, {3, 3}, {4, 3}, {5, 3}});
// array of teacher id and room id
vector<int> TEACH_ID({1, 2, 3, 4, 5, 6}), ROOM_ID({401, 402, 403, 502});
vector<string> time_slots({"08:45 - 09:45", "09:45 - 10:45", "11:00 - 12:00", "12:00 - 01:00", "01:45 - 02:45", "02:45 - 03:45"});
vector<string> days({"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"});
vector<vector<int>> TEACHER_SUB({{1, 2, 3}, {2, 3, 4}, {3, 4, 5}, {4, 5, 6}, {5, 1, 2}, {1, 4, 3}});

int slots_per_day = 6;
int days_per_weak = 5;
int no_of_divs = 3;

vector<unordered_map<int, int>> sub_sessions;
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
        teacher_sub_pair = TEACHER_SUB;
        teacher_avail = vector<int>({1, 1, 1, 1, 1});
    }
    bool isTeachable(int sub, int teach)
    {
        for (auto s : teacher_sub_pair[teach])
        {
            if (s == SUB_ID[sub].first)
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
    int getAvailableSub(int div_id, int teach_id, vector<unordered_map<int, int>> &divSubTeacher)
    {
        vector<int> SUB_Local = teacher_sub_pair[teach_id];
        vector<int> sub_assigned;
        for (auto it = divSubTeacher[div_id].begin(); it != divSubTeacher[div_id].end(); it++)
        {
            sub_assigned.push_back(it->second);
        }
        vector<int> sub_available;
        for (int i = 0; i < SUB_Local.size(); i++)
        {
            if (find(sub_assigned.begin(), sub_assigned.end(), SUB_Local[i]) == sub_assigned.end())
            {
                // subject is not assigned
                sub_available.push_back(SUB_Local[i]);
            }
        }
        // choose element randomly from available subjects and return
        if (sub_available.size() == 0)
        {
            return -1;
        }
        int sub_id = sub_available[random_num(0, sub_available.size())];
        if (sub_sessions[div_id][sub_id] <= 0)
        {
            return -1;
        }
        {
            sub_sessions[div_id][sub_id]--;
            return sub_id;
        }
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

    TTCell(int tim, int day, vector<int> &TEACH_Local, vector<int> &ROOM_ID, int div_id, vector<unordered_map<int, int>> &divSubTeacher)

    {

        int temp;
        int teach_idx, sub_idx;
        // choose randomly teacher to be assigned
        temp = random_num(0, TEACH_Local.size());
        teach_id = temp == -1 ? -1 : TEACH_Local[temp];
        if (temp != -1)
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
        if (divSubTeacher[div_id].find(teach_id) != divSubTeacher[div_id].end())
        {
            // already registered for some subject
            int temp = divSubTeacher[div_id][teach_id];

            if (sub_sessions[div_id][temp] <= 0)
            {
                // cout << temp << "Session exhausted !" << endl;
                sub_id = -1;
            }
            else
            {
                sub_id = temp;
                sub_sessions[div_id][temp]--;
            }
        }
        else
        {

            // functon to get
            sub_id = cnts.getAvailableSub(div_id, teach_idx, divSubTeacher);
            if (sub_id != -1)
                // update register
                divSubTeacher[div_id][teach_id] = sub_id;
        }

        temp = random_num(0, ROOM_ID.size());
        room_id = temp == -1 ? -1 : ROOM_ID[temp];
        ROOM_ID.erase(ROOM_ID.begin() + temp);

        time_id = tim;
        day_id = day;
    }
    TTCell(int s, int t, int tim, int d, int r)
    {
        sub_id = s;
        teach_id = t;
        time_id = tim;
        day_id = d;
        room_id = d;
    }

    void getTeacherLoad(unordered_map<int, int> &teacher_load)
    {
        teacher_load[teach_id]++;
    }

    void getSubLoad(unordered_map<int, int> &sub_load)
    {
        sub_load[sub_id]++;
    }

    void printCell()
    {
        std::cout << "\t  |sub: " << sub_id << "|room: " << room_id << "|";
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
    TTDivSet(int tim, int day, vector<unordered_map<int, int>> &divSubTeacher)
    {
        div = vector<TTCell *>(no_of_divs);
        vector<int> teach(TEACH_ID.begin(), TEACH_ID.end());
        vector<int> room(ROOM_ID.begin(), ROOM_ID.end());
        for (int i = 0; i < no_of_divs; i++)
        {
            div[i] = new TTCell(tim, day, teach, room, i, divSubTeacher);
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

    void getSubLoad(vector<unordered_map<int, int>> &divSubLoad)
    {
        for (int i = 0; i < no_of_divs; i++)
        {
            div[i]->getSubLoad(divSubLoad[i]);
        }
    }
};

// individual timetable
class timetable
{
public:
    vector<unordered_map<int, int>> divSubTeacherMap;
    vector<vector<TTDivSet>> data;
    int hardfitness;
    int softfitness;
    timetable()
    {
        data = vector<vector<TTDivSet>>(slots_per_day, vector<TTDivSet>(days_per_weak));
        divSubTeacherMap = vector<unordered_map<int, int>>(no_of_divs);
        sub_sessions.clear();
        sub_sessions = vector<unordered_map<int, int>>(no_of_divs);
        for (auto s : SUB_ID)
        {
            for (int i = 0; i < no_of_divs; i++)
            {
                sub_sessions[i][s.first] += s.second;
            }
        }
        hardfitness = INT_MAX;
        softfitness = INT_MAX;
        create();
    }

    void create()
    {

        // cnts.clear();
        for (int tim = 0; tim < slots_per_day; tim++)
        {
            for (int i = 0; i < days_per_weak; i++)
            {
                TTDivSet temp(tim, i, divSubTeacherMap);
                data[tim][i] = temp;
            }
        }
        balanceSubDistribution();
        calc_hfitness();
        calc_sfitness();
    }

    void balanceSubDistribution()
    {
        for (int i = 0; i < 10; i++)
        {
            TTDivSet temp;
            int tim1 = random_num(0, slots_per_day);
            int tim2 = random_num(0, slots_per_day);
            int day1 = random_num(0, days_per_weak);
            int day2 = random_num(0, days_per_weak);
            temp = data[tim1][day1];
            data[tim1][day1] = data[tim2][day2];
            data[tim2][day2] = temp;
        }
    }

    timetable mate(timetable &t2)
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
                    off.divSubTeacherMap = divSubTeacherMap;
                }
                else
                {
                    // choose from second parent
                    off.data[tim][i] = t2.data[tim][i];
                    off.divSubTeacherMap = t2.divSubTeacherMap;
                }
                // else
                // {
                //     // mutate
                //     TTDivSet temp(tim, i);
                //     off.data[tim][i] = temp;
                // }
            }
        }
        off.calc_hfitness();
        return off;
    }

    // hardfitness helper
    int BalanceTeacherLoad()
    {
        unordered_map<int, int> teacher_load;
        for (int i = 0; i < slots_per_day; i++)
        {
            for (int j = 0; j < days_per_weak; j++)
            {
                data[i][j].getTeacherLoad(teacher_load);
            }
        }
        return standardDeviation(teacher_load);
    }
    int BalanceSubHours()
    {
        vector<unordered_map<int, int>> divSubLoad(no_of_divs);
        for (int i = 0; i < slots_per_day; i++)
        {
            for (int j = 0; j < days_per_weak; j++)
            {
                data[i][j].getSubLoad(divSubLoad);
            }
        }
        int mean = 0;
        for (int i = 0; i < no_of_divs; i++)
        {
            for (int j = 0; j < SUB_ID.size(); j++)
            {
                mean += abs(divSubLoad[i][SUB_ID[j].first] - SUB_ID[j].second);
            }
        }
        return mean;
    }

    void calc_hfitness()
    {
        this->hardfitness = 0;
        this->hardfitness += BalanceSubHours();
    }
    void calc_sfitness()
    {
        return;
    }
    void printTeacherSub(int);
    void printForStudent();
};

void timetable::printForStudent()
{
    for (int div = 0; div < no_of_divs; div++)
    {
        std::cout << "Printing for div " << div << "\n";
        cout << "time\\days";
        for (int day = 0; day < days_per_weak; day++)
        {
            cout << "\t\t\t" << days[day];
        }
        cout << endl;
        for (int tim = 0; tim < slots_per_day; tim++)
        {
            cout << time_slots[tim];
            for (int day = 0; day < days_per_weak; day++)
            {
                data[tim][day].printDivCell(div);
            }
            std::cout << endl;
        }
        printTeacherSub(div);
        std::cout << "\n-----------------------------------------------\n";
    }
}

void timetable::printTeacherSub(int div_id)
{
    cout << "\t\t\t"
         << "Subject\t: \tTeacher" << endl;
    for (auto it = divSubTeacherMap[div_id].begin(); it != divSubTeacherMap[div_id].end(); it++)
    {
        cout << "\t\t\t" << it->second << "\t:\t" << it->first << endl;
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
    std::cout << "\nGenerating initial population..." << endl;
    vector<timetable> population(10);
    std::cout << "\nInitial Population is generated successfully !\n";
    sort(population.begin(), population.end(), dummy());
    std::cout << "Final timetable: ";
    population[0].printForStudent();
    std::cout << "\nHardfitness: " << population[0].hardfitness << endl;
    return 0;
}